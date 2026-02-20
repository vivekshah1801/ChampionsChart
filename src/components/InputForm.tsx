import { useState, type FormEvent } from 'react';
import type { MetricType } from '../utils/types';
import { METRIC_CONFIGS } from '../utils/types';
import '../styles/InputForm.css';

interface InputFormProps {
  metric: MetricType;
  onAdd: (value: number) => Promise<unknown>;
}

export function InputForm({ metric, onAdd }: InputFormProps) {
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = METRIC_CONFIGS[metric];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const numValue = parseFloat(value);
    
    if (isNaN(numValue) || numValue <= 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onAdd(numValue);
      setValue('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Enter ${config.name.toLowerCase()}`}
          step={config.step}
          min="0"
          disabled={isSubmitting}
          className="metric-input"
          style={{
            '--metric-color': config.color,
          } as React.CSSProperties}
        />
        <span className="input-unit">{config.unit}</span>
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !value}
        className="add-btn"
        style={{
          '--metric-color': config.color,
        } as React.CSSProperties}
      >
        {isSubmitting ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}
