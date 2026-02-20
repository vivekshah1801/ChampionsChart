declare module 'chart.xkcd' {
  export interface ChartOptions {
    yTickCount?: number;
    legendPosition?: number;
    showLine?: boolean;
    timeFormat?: string | undefined;
    dotSize?: number;
    unxkcdify?: boolean;
  }

  export interface Dataset {
    label: string;
    data: number[];
  }

  export interface ChartData {
    labels: string[];
    datasets: Dataset[];
  }

  export interface ChartConfig {
    title?: string;
    data: ChartData;
    options?: ChartOptions;
  }

  export class Line {
    constructor(svg: SVGSVGElement, config: ChartConfig);
  }

  export const config: {
    positionType: {
      upLeft: number;
      upRight: number;
      downLeft: number;
      downRight: number;
    };
  };

  const chartXkcd: {
    Line: typeof Line;
    config: typeof config;
  };

  export default chartXkcd;
}
