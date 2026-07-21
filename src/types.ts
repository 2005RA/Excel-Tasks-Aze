/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CellStyle {
  bold?: boolean;
  italic?: boolean;
  bgColor?: string; // Tailwind class or hex
  textColor?: string; // Tailwind class or hex
  border?: 'none' | 'thin' | 'all';
}

export interface CellData {
  value: string; // What is displayed
  formula?: string; // The raw input, e.g. "=SUM(A1:A3)" or "=A1+B1"
  style?: CellStyle;
}

export type GridData = { [cellId: string]: CellData }; // e.g., { "A1": { value: "10" } }

export interface SolvedExample {
  title: string;
  description: string;
  tableData: {
    headers: string[];
    rows: string[][];
  };
  stepByStep: string[];
  formulaUsed: string;
  resultCell: string;
  resultValue: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  guideLevel: 'high' | 'medium' | 'none';
  guideText?: string;
  initialTable: {
    headers: string[];
    rows: (string | number)[][];
    startCell?: string; // e.g., "A1" where this table should be pasted
  };
  correctFormulaCell: string; // e.g., "C5"
  correctFormulaRegex: string; // regex pattern to check formula, e.g., "^=SUM\\(B[2-4]:B[2-4]\\)$" or "=B2\\+B3\\+B4"
  correctValue: string | number; // the correct final value in that cell
  hasChartRequirement?: boolean;
  chartType?: 'bar' | 'pie';
}

export interface Topic {
  id: string;
  title: string;
  analogyTitle: string;
  analogyContent: string;
  iconName: string; // Lucide icon name
  explanation: string;
  solvedExamples: SolvedExample[];
  tasks: Task[];
  isCalculation: boolean; // SUM, COUNT, AVERAGE, ADDITION are calculation. Sürükləmə, Cədvəl, Qraf are lighter.
}
