import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Entry, MetricType } from './types';

interface ChampionsDB extends DBSchema {
  entries: {
    key: string;
    value: Entry;
    indexes: { 'by-metric': MetricType; 'by-timestamp': number };
  };
}

const DB_NAME = 'champions-chart-db';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<ChampionsDB> | null = null;

async function getDB(): Promise<IDBPDatabase<ChampionsDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<ChampionsDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const store = db.createObjectStore('entries', { keyPath: 'id' });
      store.createIndex('by-metric', 'metric');
      store.createIndex('by-timestamp', 'timestamp');
    },
  });

  return dbInstance;
}

export async function addEntry(metric: MetricType, value: number): Promise<Entry> {
  const db = await getDB();
  const entry: Entry = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    metric,
    value,
    timestamp: Date.now(),
  };
  await db.add('entries', entry);
  return entry;
}

export async function getEntries(metric: MetricType): Promise<Entry[]> {
  const db = await getDB();
  const entries = await db.getAllFromIndex('entries', 'by-metric', metric);
  return entries.sort((a, b) => a.timestamp - b.timestamp);
}

export async function deleteEntry(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('entries', id);
}

export async function getAllEntries(): Promise<Entry[]> {
  const db = await getDB();
  return db.getAll('entries');
}
