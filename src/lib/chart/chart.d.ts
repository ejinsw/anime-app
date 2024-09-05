/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/chartjs-plugin-datalabels.d.ts
import 'chart.js';
import { ChartType } from 'chart.js';

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    datalabels?: {
      align?: string | ((context: any) => string);
      anchor?: string | ((context: any) => string);
      backgroundColor?: string | ((context: any) => string);
      borderColor?: string | ((context: any) => string);
      borderRadius?: number;
      borderWidth?: number;
      clamp?: boolean;
      clip?: boolean;
      color?: string | ((context: any) => string);
      display?: boolean | ((context: any) => boolean);
      font?: {
        family?: string;
        size?: number;
        style?: string;
        weight?: string;
      };
      offset?: number;
      opacity?: number;
      padding?: number | { top: number; right: number; bottom: number; left: number };
      textAlign?: string;
      textStrokeColor?: string;
      textStrokeWidth?: number;
      textShadowColor?: string;
      textShadowBlur?: number;
      rotation?: number | ((context: any) => number);
      formatter?: (value: any, context: any) => string;
    };
  }
}