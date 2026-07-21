/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GridData } from '../types';

// Converts column letters to index (A -> 0, B -> 1)
export function colLetterToIndex(letter: string): number {
  return letter.toUpperCase().charCodeAt(0) - 65;
}

// Converts column index to letters (0 -> A, 1 -> B)
export function colIndexToLetter(index: number): string {
  return String.fromCharCode(65 + index);
}

// Parse cell reference like "A1", "B12" into { col: "A", row: 1 }
export function parseCellRef(ref: string): { col: string; row: number } | null {
  const match = ref.toUpperCase().match(/^([A-G])([0-9]+)$/);
  if (!match) return null;
  return {
    col: match[1],
    row: parseInt(match[2], 10),
  };
}

// Get array of cell IDs in a range, e.g., "A1:B3" -> ["A1", "A2", "A3", "B1", "B2", "B3"]
export function getCellRangeList(rangeStr: string): string[] {
  const parts = rangeStr.split(':');
  if (parts.length !== 2) return [rangeStr];

  const start = parseCellRef(parts[0]);
  const end = parseCellRef(parts[1]);
  if (!start || !end) return [parts[0]];

  const startColIdx = colLetterToIndex(start.col);
  const endColIdx = colLetterToIndex(end.col);
  const startRow = start.row;
  const endRow = end.row;

  const minCol = Math.min(startColIdx, endColIdx);
  const maxCol = Math.max(startColIdx, endColIdx);
  const minRow = Math.min(startRow, endRow);
  const maxRow = Math.max(startRow, endRow);

  const list: string[] = [];
  for (let c = minCol; c <= maxCol; c++) {
    for (let r = minRow; r <= maxRow; r++) {
      list.push(`${colIndexToLetter(c)}${r}`);
    }
  }
  return list;
}

// Resolves cell value, evaluating formulas recursively
export function evaluateCell(cellId: string, grid: GridData, visited: Set<string> = new Set()): string {
  const cell = grid[cellId];
  if (!cell) return '';

  const formula = cell.formula || '';
  if (!formula.startsWith('=')) {
    return cell.value;
  }

  // Circular reference guard
  if (visited.has(cellId)) {
    return '#REF!';
  }
  visited.add(cellId);

  try {
    const rawExpression = formula.substring(1).trim().toUpperCase();

    // 1. SUM Formula, e.g., SUM(A1:A5)
    if (rawExpression.startsWith('SUM(') && rawExpression.endsWith(')')) {
      const range = rawExpression.substring(4, rawExpression.length - 1);
      const cells = getCellRangeList(range);
      let sum = 0;
      cells.forEach((cId) => {
        const val = evaluateCell(cId, grid, new Set(visited));
        const num = parseFloat(val);
        if (!isNaN(num)) sum += num;
      });
      return String(sum);
    }

    // 2. AVERAGE Formula, e.g., AVERAGE(B2:B5)
    if (rawExpression.startsWith('AVERAGE(') && rawExpression.endsWith(')')) {
      const range = rawExpression.substring(8, rawExpression.length - 1);
      const cells = getCellRangeList(range);
      let sum = 0;
      let count = 0;
      cells.forEach((cId) => {
        const val = evaluateCell(cId, grid, new Set(visited));
        const num = parseFloat(val);
        if (!isNaN(num)) {
          sum += num;
          count++;
        }
      });
      return count > 0 ? String(parseFloat((sum / count).toFixed(2))) : '0';
    }

    // 3. COUNT Formula, e.g., COUNT(C1:C10)
    if (rawExpression.startsWith('COUNT(') && rawExpression.endsWith(')')) {
      const range = rawExpression.substring(6, rawExpression.length - 1);
      const cells = getCellRangeList(range);
      let count = 0;
      cells.forEach((cId) => {
        const val = evaluateCell(cId, grid, new Set(visited));
        // COUNT only counts numeric cells
        if (val !== '' && !isNaN(Number(val))) {
          count++;
        }
      });
      return String(count);
    }

    // 4. Simple addition chain, e.g., A1+B1 or A1+B1+C1
    if (rawExpression.includes('+')) {
      const cellRefs = rawExpression.replace(/\s+/g, '').split('+');
      let sum = 0;
      for (const ref of cellRefs) {
        // Is it a number?
        const num = parseFloat(ref);
        if (!isNaN(num)) {
          sum += num;
          continue;
        }

        // Is it a cell?
        const parsed = parseCellRef(ref);
        if (parsed) {
          const val = evaluateCell(ref, grid, new Set(visited));
          const cellNum = parseFloat(val);
          if (!isNaN(cellNum)) {
            sum += cellNum;
          }
        } else {
          return '#VALUE!';
        }
      }
      return String(sum);
    }

    // 5. Plain Cell Reference, e.g., =A1
    const parsedRef = parseCellRef(rawExpression);
    if (parsedRef) {
      return evaluateCell(rawExpression, grid, new Set(visited));
    }

    return '#ERROR!';
  } catch (err) {
    return '#ERROR!';
  }
}

// Evaluates the entire grid, updating displaying values for formula cells
export function evaluateGrid(grid: GridData): GridData {
  const newGrid: GridData = {};
  
  // First, copy everything
  Object.keys(grid).forEach((cellId) => {
    newGrid[cellId] = { ...grid[cellId] };
  });

  // Evaluate each formula cell
  Object.keys(newGrid).forEach((cellId) => {
    if (newGrid[cellId].formula && newGrid[cellId].formula!.startsWith('=')) {
      newGrid[cellId].value = evaluateCell(cellId, newGrid);
    }
  });

  return newGrid;
}

// Shifts cell references in formulas during autofill, e.g. =A2+B2 shifted by 1 row down becomes =A3+B3
export function shiftFormula(formula: string, rowOffset: number, colOffset: number): string {
  if (!formula.startsWith('=')) return formula;
  return formula.replace(/([A-G])([0-9]+)/gi, (match, col, row) => {
    const newRow = parseInt(row, 10) + rowOffset;
    const colIdx = colLetterToIndex(col) + colOffset;
    if (colIdx < 0 || colIdx > 6) return match; // stay within range A-G
    const newCol = colIndexToLetter(colIdx);
    return `${newCol}${newRow}`;
  });
}

