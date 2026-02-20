export type MetricType = 'weight' | 'height' | 'pushups';

export interface Entry {
  id: string;
  metric: MetricType;
  value: number;
  timestamp: number;
}

export interface MetricConfig {
  name: string;
  unit: string;
  color: string;
  step: number;
  decimals: boolean;
}

export const METRIC_CONFIGS: Record<MetricType, MetricConfig> = {
  weight: {
    name: 'Weight',
    unit: 'kg',
    color: '#4169E1', // Royal Blue
    step: 0.1,
    decimals: true,
  },
  height: {
    name: 'Height',
    unit: 'cm',
    color: '#DC143C', // Crimson Red
    step: 0.1,
    decimals: true,
  },
  pushups: {
    name: 'Pushups',
    unit: 'count',
    color: '#2E8B57', // Sea Green
    step: 1,
    decimals: false,
  },
};
