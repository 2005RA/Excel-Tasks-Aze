/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { GridData, Task, CellStyle } from '../types';
import {
  colIndexToLetter,
  colLetterToIndex,
  parseCellRef,
  getCellRangeList,
  evaluateGrid,
  shiftFormula,
} from '../utils/excelParser';
import { Bold, Grid3X3, RotateCcw, CheckCircle2, BarChart, PieChart, Info, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExcelGridProps {
  currentTask: Task;
  onSolveSuccess: () => void;
}

const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const ROWS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function ExcelGrid({ currentTask, onSolveSuccess }: ExcelGridProps) {
  const [grid, setGrid] = useState<GridData>({});
  const [activeCell, setActiveCell] = useState<string>('A1');
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editInputValue, setEditInputValue] = useState<string>('');
  
  // Selection states
  const [selectionStart, setSelectionStart] = useState<string | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [formulaBaseText, setFormulaBaseText] = useState<string>('');

  // Autofill (Dragging) states
  const [isDraggingFill, setIsDraggingFill] = useState<boolean>(false);
  const [dragFillStart, setDragFillStart] = useState<string | null>(null);
  const [dragFillEnd, setDragFillEnd] = useState<string | null>(null);

  // Chart data
  const [activeChart, setActiveChart] = useState<{ type: 'bar' | 'pie'; labels: string[]; values: number[] } | null>(null);

  // Validation feedback
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Ref to handle outer click
  const gridTableRef = useRef<HTMLTableElement>(null);

  // Initialize table when currentTask changes
  useEffect(() => {
    resetGrid();
    setFeedback(null);
    setActiveChart(null);
  }, [currentTask]);

  const resetGrid = () => {
    const initialGrid: GridData = {};
    const { headers, rows, startCell = 'A1' } = currentTask.initialTable;
    const start = parseCellRef(startCell) || { col: 'A', row: 1 };
    const startColIdx = colLetterToIndex(start.col);

    // Load headers
    headers.forEach((header, idx) => {
      const colLetter = colIndexToLetter(startColIdx + idx);
      const cellId = `${colLetter}${start.row}`;
      initialGrid[cellId] = {
        value: header,
        style: { bold: true, bgColor: 'bg-indigo-50', textColor: 'text-indigo-950', border: 'all' },
      };
    });

    // Load rows
    rows.forEach((row, rowOffset) => {
      row.forEach((cellVal, colOffset) => {
        const colLetter = colIndexToLetter(startColIdx + colOffset);
        const cellId = `${colLetter}${start.row + 1 + rowOffset}`;
        const strVal = String(cellVal);
        
        // Check if value is a formula or simple number/text
        if (strVal.startsWith('=')) {
          initialGrid[cellId] = {
            value: '',
            formula: strVal,
            style: { border: 'all' },
          };
        } else {
          initialGrid[cellId] = {
            value: strVal,
            style: { border: 'all' },
          };
        }
      });
    });

    // Evaluate whole grid
    const evaluated = evaluateGrid(initialGrid);
    setGrid(evaluated);
    setActiveCell(`${start.col}${start.row + rows.length + 1}`); // Select target cell initially
  };

  // Helper to check if a cell is selected in current range
  const isCellSelected = (cellId: string) => {
    if (!selectionStart || !selectionEnd) return activeCell === cellId;
    const start = parseCellRef(selectionStart);
    const end = parseCellRef(selectionEnd);
    const curr = parseCellRef(cellId);
    if (!start || !end || !curr) return activeCell === cellId;

    const minCol = Math.min(colLetterToIndex(start.col), colLetterToIndex(end.col));
    const maxCol = Math.max(colLetterToIndex(start.col), colLetterToIndex(end.col));
    const minRow = Math.min(start.row, end.row);
    const maxRow = Math.max(start.row, end.row);

    const currColIdx = colLetterToIndex(curr.col);
    return (
      currColIdx >= minCol &&
      currColIdx <= maxCol &&
      curr.row >= minRow &&
      curr.row <= maxRow
    );
  };

  // Helper to check if cell is in autofill drag region
  const isCellInDragFill = (cellId: string) => {
    if (!isDraggingFill || !dragFillStart || !dragFillEnd) return false;
    const start = parseCellRef(dragFillStart);
    const end = parseCellRef(dragFillEnd);
    const curr = parseCellRef(cellId);
    if (!start || !end || !curr) return false;

    // Autofill usually extends either vertically or horizontally from active cell
    const minCol = Math.min(colLetterToIndex(start.col), colLetterToIndex(end.col));
    const maxCol = Math.max(colLetterToIndex(start.col), colLetterToIndex(end.col));
    const minRow = Math.min(start.row, end.row);
    const maxRow = Math.max(start.row, end.row);

    const currColIdx = colLetterToIndex(curr.col);
    return (
      currColIdx >= minCol &&
      currColIdx <= maxCol &&
      curr.row >= minRow &&
      curr.row <= maxRow
    );
  };

  // Get selected cell list
  const getSelectedCellsList = (): string[] => {
    if (!selectionStart) return [activeCell];
    const endCell = selectionEnd || selectionStart;
    return getCellRangeList(`${selectionStart}:${endCell}`);
  };

  const updateGridCellFormula = (cellId: string, formulaStr: string) => {
    const updatedGrid = { ...grid };
    updatedGrid[cellId] = {
      ...updatedGrid[cellId],
      formula: formulaStr,
      value: '', // will be evaluated
    };
    const evaluated = evaluateGrid(updatedGrid);
    setGrid(evaluated);
  };

  // Mouse Handlers for Range Selection
  const handleCellMouseDown = (cellId: string, e: React.MouseEvent) => {
    // If clicking on fill handle, ignore this
    if ((e.target as HTMLElement).classList.contains('fill-handle')) return;

    // Check if we are currently editing a formula
    const isFormulaEditing = editingCell !== null && editInputValue.trim().startsWith('=');

    if (isFormulaEditing) {
      // Prevent focus loss from the active input!
      e.preventDefault();

      setIsSelecting(true);
      setSelectionStart(cellId);
      setSelectionEnd(cellId);
      
      // Determine base formula by stripping any trailing cell/range reference from editInputValue
      const base = editInputValue.replace(/[A-G]\d+(?::[A-G]\d+)?$/i, '');
      setFormulaBaseText(base);
      
      // Update the formula bar and input value with the newly selected cell!
      const newVal = base + cellId;
      setEditInputValue(newVal);
      
      updateGridCellFormula(editingCell!, newVal);
    } else {
      setIsSelecting(true);
      setSelectionStart(cellId);
      setSelectionEnd(cellId);
      setActiveCell(cellId);
      setEditingCell(null);
    }
  };

  const handleCellMouseEnter = (cellId: string) => {
    if (isSelecting) {
      setSelectionEnd(cellId);
      
      // Check if we are in formula editing mode
      const isFormulaEditing = editingCell !== null && editInputValue.trim().startsWith('=');
      if (isFormulaEditing) {
        const rangeStr = selectionStart === cellId ? cellId : `${selectionStart}:${cellId}`;
        const newVal = formulaBaseText + rangeStr;
        setEditInputValue(newVal);
        updateGridCellFormula(editingCell!, newVal);
      }
    } else if (isDraggingFill) {
      setDragFillEnd(cellId);
    }
  };

  const handleMouseUp = () => {
    if (isSelecting) {
      setIsSelecting(false);
    }
    if (isDraggingFill) {
      handleCompleteAutofill();
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSelecting, isDraggingFill, dragFillStart, dragFillEnd, activeCell, grid]);

  // Handle Autofill logic
  const handleStartAutofill = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDraggingFill(true);
    setDragFillStart(activeCell);
    setDragFillEnd(activeCell);
  };

  const handleCompleteAutofill = () => {
    setIsDraggingFill(false);
    if (!dragFillStart || !dragFillEnd || dragFillStart === dragFillEnd) return;

    const start = parseCellRef(dragFillStart);
    const end = parseCellRef(dragFillEnd);
    if (!start || !end) return;

    const sourceCell = grid[dragFillStart];
    if (!sourceCell) return;

    const startColIdx = colLetterToIndex(start.col);
    const endColIdx = colLetterToIndex(end.col);

    const minCol = Math.min(startColIdx, endColIdx);
    const maxCol = Math.max(startColIdx, endColIdx);
    const minRow = Math.min(start.row, end.row);
    const maxRow = Math.max(start.row, end.row);

    const updatedGrid = { ...grid };

    for (let c = minCol; c <= maxCol; c++) {
      for (let r = minRow; r <= maxRow; r++) {
        const cellId = `${colIndexToLetter(c)}${r}`;
        if (cellId === dragFillStart) continue; // Skip source

        const rowOffset = r - start.row;
        const colOffset = c - startColIdx;

        // Clone style of source
        const newStyle = sourceCell.style ? { ...sourceCell.style } : { border: 'all' as const };

        if (sourceCell.formula) {
          // It's a formula, we shift the formula cell references
          const shifted = shiftFormula(sourceCell.formula, rowOffset, colOffset);
          updatedGrid[cellId] = {
            value: '',
            formula: shifted,
            style: newStyle,
          };
        } else {
          // If it's a numeric sequence, check if we should auto-increment
          // e.g. A1=1, A2=2 dragged to A3 is 3
          // For simplicity and kid's use, we copy value or increment if source is simple number
          const num = parseFloat(sourceCell.value);
          if (!isNaN(num) && rowOffset !== 0) {
            // Check if preceding cell exists to compute step
            const prevCellId = `${colIndexToLetter(c)}${r - 1}`;
            const prevCell = grid[prevCellId];
            let step = 1;
            if (prevCell && !isNaN(parseFloat(prevCell.value))) {
              step = parseFloat(sourceCell.value) - parseFloat(prevCell.value);
            }
            updatedGrid[cellId] = {
              value: String(num + rowOffset * step),
              style: newStyle,
            };
          } else {
            // Just copy text/value
            updatedGrid[cellId] = {
              value: sourceCell.value,
              style: newStyle,
            };
          }
        }
      }
    }

    const evaluated = evaluateGrid(updatedGrid);
    setGrid(evaluated);
    setDragFillStart(null);
    setDragFillEnd(null);
  };

  // Edit cell logic
  const handleCellDoubleClick = (cellId: string) => {
    setEditingCell(cellId);
    const cell = grid[cellId];
    setEditInputValue(cell?.formula || cell?.value || '');
  };

  const handleCellCommit = (cellId: string, val: string) => {
    const updatedGrid = { ...grid };
    const cleanVal = val.trim();

    if (cleanVal.startsWith('=')) {
      updatedGrid[cellId] = {
        ...updatedGrid[cellId],
        formula: cleanVal,
        value: '', // will be evaluated
      };
    } else {
      updatedGrid[cellId] = {
        ...updatedGrid[cellId],
        formula: undefined,
        value: cleanVal,
      };
    }

    const evaluated = evaluateGrid(updatedGrid);
    setGrid(evaluated);
    setEditingCell(null);
  };

  // Keyboard navigation inside grid
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (editingCell) {
      if (e.key === 'Enter') {
        handleCellCommit(editingCell, editInputValue);
      } else if (e.key === 'Escape') {
        setEditingCell(null);
      }
      return;
    }

    const active = parseCellRef(activeCell);
    if (!active) return;

    let colIdx = colLetterToIndex(active.col);
    let rowIdx = active.row;

    if (e.key === 'ArrowUp' && rowIdx > 1) {
      rowIdx--;
      e.preventDefault();
    } else if (e.key === 'ArrowDown' && rowIdx < 12) {
      rowIdx++;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' && colIdx > 0) {
      colIdx--;
      e.preventDefault();
    } else if (e.key === 'ArrowRight' && colIdx < COLS.length - 1) {
      colIdx++;
      e.preventDefault();
    } else if (e.key === 'Enter') {
      setEditingCell(activeCell);
      setEditInputValue(grid[activeCell]?.formula || grid[activeCell]?.value || '');
      e.preventDefault();
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      // Clear cell content
      const updated = { ...grid };
      updated[activeCell] = { ...updated[activeCell], value: '', formula: undefined };
      setGrid(evaluateGrid(updated));
      e.preventDefault();
    }

    const newCellId = `${colIndexToLetter(colIdx)}${rowIdx}`;
    setActiveCell(newCellId);
    setSelectionStart(newCellId);
    setSelectionEnd(newCellId);
  };

  // Toolbar actions
  const applyStyle = (styleProps: Partial<CellStyle>) => {
    const cells = getSelectedCellsList();
    const updatedGrid = { ...grid };
    cells.forEach((cellId) => {
      const cell = updatedGrid[cellId] || { value: '' };
      updatedGrid[cellId] = {
        ...cell,
        style: {
          ...(cell.style || { border: 'all' }),
          ...styleProps,
        },
      };
    });
    setGrid(updatedGrid);
  };

  // Solution Validation
  const checkSolution = () => {
    const targetCellId = currentTask.correctFormulaCell;
    const targetCell = grid[targetCellId];

    if (!targetCell) {
      setFeedback({
        isCorrect: false,
        message: `Hələ ki, ${targetCellId} xanasında heç nə yazılmayıb. Düsturu bura yazmalısan!`,
      });
      return;
    }

    const formula = (targetCell.formula || '').toUpperCase().replace(/\s+/g, '');
    const value = (targetCell.value || '').trim();

    // Regular Expression check
    const regex = new RegExp(currentTask.correctFormulaRegex, 'i');
    const isFormulaMatch = regex.test(formula);
    const isValueMatch = value === String(currentTask.correctValue);

    if (isFormulaMatch && isValueMatch) {
      setFeedback({
        isCorrect: true,
        message: `Əladır! Çox gözəl! 🎉 ${targetCellId} xanasına düzgün düstur yazdın və nəticəni ${value} tapdın! Afərin!`,
      });
      // Confetti burst
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
      onSolveSuccess();
    } else if (isValueMatch && !isFormulaMatch) {
      setFeedback({
        isCorrect: false,
        message: `Sən düzgün cavabı (${value}) əllə yazmısan, yaxud fərqli düstur istifadə etmisən. Bizə mütləq dərslikdə öyrəndiyimiz rəsmi Excel düsturu lazımdır! Zəhmət olmasa təlimatdakı düsturu istifadə et.`,
      });
    } else {
      setFeedback({
        isCorrect: false,
        message: `Təəssüf ki, cavab hələ düzgün deyil. Sənin yazdığın formula: "${targetCell.formula || 'yoxdur'}", aldığın nəticə isə: "${targetCell.value || '0'}"-dir. Bir daha yoxla! Köksüz və ya köməkçi hissəni təkrar oxu.`,
      });
    }
  };

  // Create chart from selection
  const createChartFromSelection = (type: 'bar' | 'pie') => {
    const cells = getSelectedCellsList();
    if (cells.length < 2) {
      alert('Zəhmət olmasa, qrafik qurmaq üçün ən azı 2 xananı seçin (məsələn, bir sütun başlıqları, digəri rəqəmlər).');
      return;
    }

    // Try to partition selected cells into labels (text) and values (numbers)
    const labels: string[] = [];
    const values: number[] = [];

    cells.forEach((cellId) => {
      const cell = grid[cellId];
      if (cell) {
        const val = cell.value;
        const num = parseFloat(val);
        if (isNaN(num)) {
          if (val !== '') labels.push(val);
        } else {
          values.push(num);
        }
      }
    });

    // If no labels found, create dummy labels
    if (labels.length === 0) {
      values.forEach((_, idx) => labels.push(`Göstərici ${idx + 1}`));
    }

    // Trim lists to match lengths
    const minLength = Math.min(labels.length, values.length);
    const finalLabels = labels.slice(0, minLength);
    const finalValues = values.slice(0, minLength);

    if (finalValues.length === 0) {
      alert('Seçdiyiniz xanalarda rəqəm tapılmadı! Zəhmət olmasa rəqəm olan xanaları da seçin.');
      return;
    }

    setActiveChart({
      type,
      labels: finalLabels,
      values: finalValues,
    });
  };

  const activeCellData = grid[activeCell];
  const formulaBarValue = editingCell === activeCell ? editInputValue : (activeCellData?.formula || activeCellData?.value || '');

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Excel Grid container */}
      <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-5 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pb-4 border-b border-sky-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-50 text-sky-600 rounded-2xl border border-sky-100/50">
              <Grid3X3 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-sky-500 uppercase tracking-wider block">Excel Simulyatoru</span>
              <h3 className="text-base font-extrabold text-sky-950">İnteraktiv İş Vərəqi</h3>
            </div>
          </div>

          {/* Quick actions toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Bold */}
            <button
              onClick={() => applyStyle({ bold: !activeCellData?.style?.bold })}
              className={`p-2 rounded-xl border border-sky-100 transition hover:bg-sky-50 ${activeCellData?.style?.bold ? 'bg-sky-50 text-sky-600 border-sky-200 shadow-xs' : 'text-slate-600'}`}
              title="Qalın mətn"
            >
              <Bold className="w-4 h-4" />
            </button>

            {/* Borders */}
            <button
              onClick={() => applyStyle({ border: activeCellData?.style?.border === 'all' ? 'none' : 'all' })}
              className={`p-2 rounded-xl border border-sky-100 transition hover:bg-sky-50 ${activeCellData?.style?.border === 'all' ? 'bg-sky-50 text-sky-600 border-sky-200 shadow-xs' : 'text-slate-600'}`}
              title="Sərhədləri çək"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>

            {/* Background colors */}
            <div className="flex items-center gap-1 border border-sky-100 rounded-xl p-1 bg-white shadow-xs">
              <span className="text-xs text-slate-400 px-1 font-medium">Fon:</span>
              {[
                { class: 'bg-white', hex: 'bg-white', label: 'Ağ' },
                { class: 'bg-blue-100', hex: 'bg-blue-100', label: 'Mavi' },
                { class: 'bg-amber-100', hex: 'bg-amber-100', label: 'Sarı' },
                { class: 'bg-emerald-100', hex: 'bg-emerald-100', label: 'Yaşıl' },
                { class: 'bg-rose-100', hex: 'bg-rose-100', label: 'Qırmızı' },
              ].map((color) => (
                <button
                  key={color.class}
                  onClick={() => applyStyle({ bgColor: color.class })}
                  className={`w-5 h-5 rounded border border-slate-300 transition hover:scale-110 ${color.class}`}
                  title={color.label}
                />
              ))}
            </div>

            {/* Text colors */}
            <div className="flex items-center gap-1 border border-sky-100 rounded-xl p-1 bg-white shadow-xs">
              <span className="text-xs text-slate-400 px-1 font-medium">Yazı:</span>
              {[
                { class: 'text-slate-900', label: 'Qara' },
                { class: 'text-blue-600', label: 'Mavi' },
                { class: 'text-emerald-600', label: 'Yaşıl' },
                { class: 'text-rose-600', label: 'Qırmızı' },
              ].map((color) => (
                <button
                  key={color.class}
                  onClick={() => applyStyle({ textColor: color.class })}
                  className={`w-5 h-5 rounded border border-slate-300 flex items-center justify-center font-bold text-xs hover:scale-110 ${color.class}`}
                  title={color.label}
                >
                  A
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Formula Bar */}
        <div className="flex items-center gap-2 bg-sky-50/50 border border-sky-100 rounded-2xl p-2.5 my-4">
          <div className="bg-white border border-sky-200 text-sky-700 px-3.5 py-1.5 rounded-xl font-mono text-sm font-bold min-w-[55px] text-center shadow-sm">
            {activeCell}
          </div>
          <span className="text-sky-400 font-serif font-extrabold italic select-none text-lg px-1">fx</span>
          <input
            type="text"
            value={formulaBarValue}
            onChange={(e) => {
              setEditInputValue(e.target.value);
              handleCellCommit(activeCell, e.target.value);
            }}
            onFocus={() => {
              setEditingCell(activeCell);
              setEditInputValue(grid[activeCell]?.formula || grid[activeCell]?.value || '');
            }}
            placeholder="Düstur və ya ədəd daxil et... (məs: =SUM(B2:B5) və ya 12)"
            className="flex-1 bg-white border border-sky-200 rounded-xl px-3.5 py-1.5 text-sm font-mono focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-xs"
          />
        </div>

        {/* Excel Interactive Table */}
        <div className="overflow-x-auto border border-sky-100 rounded-2xl shadow-xs max-w-full bg-white">
          <table
            ref={gridTableRef}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            className="table-fixed border-collapse bg-slate-50 font-sans text-sm w-full min-w-[600px] outline-none select-none"
          >
            {/* Column Headers */}
            <thead>
              <tr>
                <th className="w-12 bg-sky-50/50 border border-sky-100 text-sky-600 font-bold text-center py-2 text-xs"></th>
                {COLS.map((col) => (
                  <th
                    key={col}
                    className="bg-sky-50/50 border border-sky-100 text-sky-600 font-bold text-center py-2 text-xs tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody>
              {ROWS.map((row) => (
                <tr key={row}>
                  {/* Row index header */}
                  <td className="bg-sky-50/50 border border-sky-100 text-sky-600 font-bold text-center text-xs py-1.5">
                    {row}
                  </td>

                  {/* Grid cells */}
                  {COLS.map((col) => {
                    const cellId = `${col}${row}`;
                    const cell = grid[cellId];
                    const isSelected = isCellSelected(cellId);
                    const isInDrag = isCellInDragFill(cellId);
                    const isActive = activeCell === cellId;
                    const isEditing = editingCell === cellId;

                    // Custom styling
                    const style = cell?.style || {};
                    const boldClass = style.bold ? 'font-bold' : '';
                    const italicClass = style.italic ? 'italic' : '';
                    const bgClass = style.bgColor || 'bg-white';
                    const textClass = style.textColor || 'text-slate-800';
                    const borderClass = style.border === 'none' ? 'border-transparent' : 'border-sky-50';

                    return (
                      <td
                        key={cellId}
                        onMouseDown={(e) => handleCellMouseDown(cellId, e)}
                        onMouseEnter={() => handleCellMouseEnter(cellId)}
                        onDoubleClick={() => handleCellDoubleClick(cellId)}
                        className={`relative border ${borderClass} ${bgClass} ${textClass} ${boldClass} ${italicClass} p-1 text-left min-h-[32px] cursor-cell transition-all duration-75`}
                        style={{
                          boxShadow: isSelected
                            ? 'inset 0 0 0 1px #38BDF8, 0 0 0 1.5px #0284C7'
                            : isInDrag
                            ? 'inset 0 0 0 1.5px #D97706'
                            : 'none',
                          zIndex: isSelected || isInDrag ? 10 : 1,
                        }}
                      >
                        {isEditing ? (
                          <input
                            type="text"
                            value={editInputValue}
                            onChange={(e) => setEditInputValue(e.target.value)}
                            onBlur={() => handleCellCommit(cellId, editInputValue)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleCellCommit(cellId, editInputValue);
                              } else if (e.key === 'Escape') {
                                setEditingCell(null);
                              }
                            }}
                            autoFocus
                            className="absolute inset-0 w-full h-full bg-white border-2 border-sky-500 px-1 font-mono text-xs focus:outline-none focus:ring-0 z-30 rounded-sm"
                          />
                        ) : (
                          <div className="truncate w-full text-xs font-semibold px-1 h-5 flex items-center">
                            {cell?.value || ''}
                          </div>
                        )}

                        {/* Excel Autofill handle (only show on active selected cell) */}
                        {isActive && !isEditing && (
                          <div
                            onMouseDown={handleStartAutofill}
                            className="fill-handle absolute right-[-4px] bottom-[-4px] w-[8px] h-[8px] bg-sky-600 border border-white cursor-crosshair z-20 hover:scale-150 transition-transform shadow-sm"
                            title="Aşağı/Yana sürükləyərək doldur"
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-5">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={checkSolution}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-2xl shadow-md shadow-emerald-100 transition hover:-translate-y-0.5 active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5" />
              Cavabı Yoxla
            </button>

            <button
              onClick={resetGrid}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-3 rounded-2xl border border-slate-200 transition active:scale-95"
              title="Cədvəli sıfırla"
            >
              <RotateCcw className="w-4 h-4" />
              Cədvəli Sıfırla
            </button>
          </div>

          {/* Quick Chart generators */}
          <div className="flex items-center gap-2 bg-sky-50 p-1.5 rounded-2xl border border-sky-100 shadow-xs">
            <span className="text-xs text-sky-700 font-bold px-2">Qrafik Qur:</span>
            <button
              onClick={() => createChartFromSelection('bar')}
              className="flex items-center gap-1.5 bg-white hover:bg-sky-100 text-sky-800 text-xs font-bold py-1.5 px-3 rounded-xl border border-sky-200 shadow-sm transition"
              title="Sütunlu Qrafik qur"
            >
              <BarChart className="w-3.5 h-3.5 text-sky-600" />
              Sütunlu
            </button>
            <button
              onClick={() => createChartFromSelection('pie')}
              className="flex items-center gap-1.5 bg-white hover:bg-sky-100 text-sky-800 text-xs font-bold py-1.5 px-3 rounded-xl border border-sky-200 shadow-sm transition"
              title="Dairəvi Qrafik qur"
            >
              <PieChart className="w-3.5 h-3.5 text-sky-600" />
              Dairəvi
            </button>
          </div>
        </div>

        {/* Tip Box */}
        <div className="mt-4 bg-amber-50 rounded-2xl p-4 border border-amber-100/70 flex items-start gap-2.5 text-amber-900 text-xs leading-relaxed font-medium shadow-xs">
          <Info className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
          <div>
            <span className="font-bold text-amber-950">Gözəl fəndlər:</span> Hüceyrələri redaktə etmək üçün üzərində cüt klikləyin. Sol düyməni basılı saxlayıb dartmaqla bir çox hüceyrəni seçə bilərsiniz. Sağ alt küncdəki balaca mavi kvadratı aşağı dartmaqla düsturları sürükləyib doldura bilərsiniz.
          </div>
        </div>
      </div>

      {/* Validation Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 animate-fade-in ${
            feedback.isCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <div className="text-xl shrink-0">{feedback.isCorrect ? '🏆' : '💡'}</div>
          <div>
            <h4 className="font-bold text-sm mb-1">{feedback.isCorrect ? 'TƏBRİKLƏR! AFƏRİN!' : 'İPUCU / KÖMƏKÇİ'}</h4>
            <p className="text-xs leading-relaxed font-medium">{feedback.message}</p>
          </div>
        </div>
      )}

      {/* Render Custom dynamic SVG Chart if active */}
      {activeChart && (
        <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 w-full transition-all duration-200">
          <div className="flex justify-between items-center bg-purple-50 text-purple-950 px-4 py-3 rounded-2xl border border-purple-100/80 mb-4 w-full">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-purple-100 text-purple-700 rounded-xl border border-purple-200/50">
                {activeChart.type === 'bar' ? <BarChart className="w-4 h-4" /> : <PieChart className="w-4 h-4" />}
              </div>
              <div>
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Seçimə Görə Qurulan Qrafik</span>
                <h4 className="font-bold text-sm sm:text-base">{activeChart.type === 'bar' ? 'Sütunlu Qrafik (Bar Chart)' : 'Dairəvi Qrafik (Pie Chart)'}</h4>
              </div>
            </div>
            <button
              onClick={() => setActiveChart(null)}
              className="text-xs font-bold text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100 transition bg-white"
            >
              Qrafiki gizlə
            </button>
          </div>

          {activeChart.type === 'bar' ? (
            /* Custom Responsive SVG Bar Chart */
            <div className="w-full flex flex-col items-center">
              <svg viewBox="0 0 500 250" className="w-full max-w-lg">
                {/* Grid Lines */}
                {[0, 50, 100, 150, 200].map((y) => (
                  <line
                    key={y}
                    x1="40"
                    y1={210 - y}
                    x2="480"
                    y2={210 - y}
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                ))}

                {/* Bars */}
                {activeChart.values.map((val, idx) => {
                  const barCount = activeChart.values.length;
                  const chartHeight = 200;
                  const maxVal = Math.max(...activeChart.values, 1);
                  const barHeight = (val / maxVal) * 160; // scale bars
                  const barWidth = Math.min(300 / barCount, 40);
                  const spacing = (440 - barWidth * barCount) / (barCount + 1);
                  const x = 40 + spacing + idx * (barWidth + spacing);
                  const y = 210 - barHeight;

                  return (
                    <g key={idx} className="group cursor-pointer">
                      {/* Bar */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        rx="4"
                        fill={idx % 2 === 0 ? '#0284C7' : '#10B981'}
                        className="transition-all duration-300 hover:opacity-80"
                      />
                      {/* Label top of bar */}
                      <text
                        x={x + barWidth / 2}
                        y={y - 8}
                        textAnchor="middle"
                        className="text-[10px] font-bold fill-sky-800"
                      >
                        {val}
                      </text>
                      {/* X axis Label */}
                      <text
                        x={x + barWidth / 2}
                        y="230"
                        textAnchor="middle"
                        className="text-[10px] font-semibold fill-sky-600"
                      >
                        {activeChart.labels[idx] || `Sütun ${idx + 1}`}
                      </text>
                    </g>
                  );
                })}
                {/* X Axis */}
                <line x1="30" y1="210" x2="490" y2="210" stroke="#38BDF8" strokeWidth="1.5" />
              </svg>
              <p className="text-[11px] text-sky-500 mt-2 italic text-center">
                * Bu qrafik sənin seçdiyin xanalardakı rəqəmlərin fərqini (hündürlüyünü) göstərir!
              </p>
            </div>
          ) : (
            /* Custom SVG Pie Chart */
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6">
              <svg viewBox="0 0 200 200" className="w-48 h-48">
                {(() => {
                  const total = activeChart.values.reduce((a, b) => a + b, 0);
                  let accumulatedAngle = 0;
                  const colors = ['#0284C7', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6'];

                  return activeChart.values.map((val, idx) => {
                    const percentage = total > 0 ? val / total : 1;
                    const angle = percentage * 360;

                    // Compute path for pie slice
                    const r = 80;
                    const cx = 100;
                    const cy = 100;

                    const radStart = (accumulatedAngle - 90) * (Math.PI / 180);
                    const radEnd = (accumulatedAngle + angle - 90) * (Math.PI / 180);

                    const x1 = cx + r * Math.cos(radStart);
                    const y1 = cy + r * Math.sin(radStart);
                    const x2 = cx + r * Math.cos(radEnd);
                    const y2 = cy + r * Math.sin(radEnd);

                    const largeArcFlag = angle > 180 ? 1 : 0;

                    const d =
                      angle === 360
                        ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`
                        : `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                    accumulatedAngle += angle;
                    const color = colors[idx % colors.length];

                    return (
                      <path
                        key={idx}
                        d={d}
                        fill={color}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                        title={`${activeChart.labels[idx]}: ${val}`}
                      />
                    );
                  });
                })()}
              </svg>

              {/* Pie Legends */}
              <div className="flex flex-col gap-1.5 max-w-xs">
                {activeChart.values.map((val, idx) => {
                  const total = activeChart.values.reduce((a, b) => a + b, 0);
                  const percentage = total > 0 ? Math.round((val / total) * 100) : 0;
                  const colors = ['#0284C7', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6'];

                  return (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-sky-900">
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0"
                        style={{ backgroundColor: colors[idx % colors.length] }}
                      />
                      <span className="truncate max-w-[120px]">{activeChart.labels[idx]}</span>
                      <span className="text-sky-400 font-mono">({val} - {percentage}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
