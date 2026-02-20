import type { MetricType } from '../utils/types';
import { METRIC_CONFIGS } from '../utils/types';
import '../styles/MetricSelector.css';

interface MetricSelectorProps {
  selected: MetricType;
  onSelect: (metric: MetricType) => void;
}

export function MetricSelector({ selected, onSelect }: MetricSelectorProps) {
  const metrics: MetricType[] = ['weight', 'height', 'pushups'];

  return (
    <div className="metric-selector">
      {metrics.map((metric) => (
        <button
          key={metric}
          className={`metric-btn ${selected === metric ? 'active' : ''}`}
          onClick={() => onSelect(metric)}
          style={{
            '--metric-color': METRIC_CONFIGS[metric].color,
          } as React.CSSProperties}
        >
          {METRIC_CONFIGS[metric].name}
        </button>
      ))}
    </div>
  );
}
