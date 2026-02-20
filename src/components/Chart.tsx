import { useEffect, useRef } from 'react';
import chartXkcd from 'chart.xkcd';
import type { Entry, MetricType } from '../utils/types';
import { METRIC_CONFIGS } from '../utils/types';
import '../styles/Chart.css';

interface ChartProps {
  entries: Entry[];
  metric: MetricType;
}

export function Chart({ entries, metric }: ChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!svgRef.current || entries.length === 0) {
      return;
    }

    // Clean up previous chart
    if (chartRef.current) {
      svgRef.current.innerHTML = '';
    }

    const config = METRIC_CONFIGS[metric];
    
    // Prepare data - take last 20 entries
    const recentEntries = entries.slice(-20);
    const labels = recentEntries.map((entry) => {
      const date = new Date(entry.timestamp);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });
    const values = recentEntries.map((entry) => entry.value);

    // Create chart
    chartRef.current = new chartXkcd.Line(svgRef.current, {
      title: `${config.name} Progress`,
      data: {
        labels,
        datasets: [
          {
            label: config.unit,
            data: values,
          },
        ],
      },
      options: {
        yTickCount: 5,
        legendPosition: chartXkcd.config.positionType.upRight,
        showLine: true,
        timeFormat: undefined,
        dotSize: 0.5,
        unxkcdify: false,
      },
    });

    // Apply metric color to the chart line
    const paths = svgRef.current.querySelectorAll('path[fill="none"]');
    paths.forEach((path) => {
      (path as SVGPathElement).setAttribute('stroke', config.color);
    });

  }, [entries, metric]);

  if (entries.length === 0) {
    return (
      <div className="chart-empty">
        <p>No data yet!</p>
        <p>Add your first entry above 👆</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <svg ref={svgRef}></svg>
    </div>
  );
}
