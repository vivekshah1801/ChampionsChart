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
        <div className="credits">
          Made with 🤖 by ChatGPT and Copilot<br />
          while <a href="https://github.com/vivekshah1801" target="_blank" rel="noopener noreferrer">Vivek Shah</a> sips his tea.
          <div className="small">Send him a <a href="https://linkedin.com/in/vivekshah1801" target="_blank" rel="noopener noreferrer">Hi</a>. He likes to talk to AI and Humans.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
