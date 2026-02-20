import { useState } from 'react';
import type { MetricType } from './utils/types';
import { useMetricData } from './hooks/useMetricData';
import { MetricSelector } from './components/MetricSelector';
import { InputForm } from './components/InputForm';
import { Chart } from './components/Chart';
import { EntriesList } from './components/EntriesList';
import './styles/App.css';

function App() {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('weight');
  const { entries, loading, error, add, remove } = useMetricData(selectedMetric);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Champions Chart</h1>
        <p className="subtitle">Track your progress</p>
      </header>

      <main className="app-main">
        <MetricSelector selected={selectedMetric} onSelect={setSelectedMetric} />
        
        <InputForm metric={selectedMetric} onAdd={add} />

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <Chart entries={entries} metric={selectedMetric} />
            <EntriesList entries={entries} metric={selectedMetric} onDelete={remove} />
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>Keep pushing! 💪</p>
      </footer>
    </div>
  );
}

export default App;
