import type { Entry, MetricType } from '../utils/types';
import { METRIC_CONFIGS } from '../utils/types';
import '../styles/EntriesList.css';

interface EntriesListProps {
  entries: Entry[];
  metric: MetricType;
  onDelete: (id: string) => void;
}

export function EntriesList({ entries, metric, onDelete }: EntriesListProps) {
  const config = METRIC_CONFIGS[metric];
  
  // Show last 10 entries in reverse order (newest first)
  const recentEntries = [...entries].reverse().slice(0, 10);

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="entries-list">
      <h3>Recent Entries</h3>
      <div className="entries">
        {recentEntries.map((entry) => {
          const date = new Date(entry.timestamp);
          const dateStr = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });
          const timeStr = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div key={entry.id} className="entry-item">
              <div className="entry-info">
                <span className="entry-value" style={{ color: config.color }}>
                  {entry.value} {config.unit}
                </span>
                <span className="entry-date">
                  {dateStr} at {timeStr}
                </span>
              </div>
              <button
                className="delete-btn"
                onClick={() => onDelete(entry.id)}
                aria-label="Delete entry"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
