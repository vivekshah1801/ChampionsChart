import { useState, useEffect, useCallback } from 'react';
import type { Entry, MetricType } from '../utils/types';
import { addEntry, getEntries, deleteEntry } from '../utils/db';

export function useMetricData(metric: MetricType) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEntries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getEntries(metric);
      setEntries(data);
      setError(null);
    } catch (err) {
      setError('Failed to load entries');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [metric]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const add = useCallback(
    async (value: number) => {
      try {
        const entry = await addEntry(metric, value);
        setEntries((prev) => [...prev, entry].sort((a, b) => a.timestamp - b.timestamp));
        return entry;
      } catch (err) {
        setError('Failed to add entry');
        console.error(err);
        throw err;
      }
    },
    [metric]
  );

  const remove = useCallback(async (id: string) => {
    try {
      await deleteEntry(id);
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      setError('Failed to delete entry');
      console.error(err);
      throw err;
    }
  }, []);

  return {
    entries,
    loading,
    error,
    add,
    remove,
    refresh: loadEntries,
  };
}
