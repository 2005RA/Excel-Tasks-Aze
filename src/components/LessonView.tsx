/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Topic, SolvedExample } from '../types';
import { BookOpen, HelpCircle, Check, PlayCircle, HelpCircle as HelpIcon, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface LessonViewProps {
  topic: Topic;
  onGoToTasks: () => void;
}

export default function LessonView({ topic, onGoToTasks }: LessonViewProps) {
  const [activeExampleIdx, setActiveExampleIdx] = useState<number>(0);

  const activeExample: SolvedExample | undefined = topic.solvedExamples[activeExampleIdx];

  return (
    <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 flex flex-col gap-6 w-full animate-fade-in">
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-sky-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-50 rounded-2xl text-sky-600 border border-sky-100/50">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-sky-500 uppercase tracking-wider block">Excel Dərsi</span>
            <h2 className="text-xl sm:text-2xl font-bold text-sky-950">{topic.title}</h2>
          </div>
        </div>
        <button
          onClick={onGoToTasks}
          className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-md transition hover:-translate-y-0.5 shrink-0 shadow-sky-100 active:scale-95"
        >
          Çalışmalara Başla
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Analogy Block (Fun explanation) */}
      <div className="bg-amber-50/60 rounded-2xl p-5 border-l-4 border-amber-400 flex gap-4 shadow-xs">
        <div className="text-3xl shrink-0 select-none">💡</div>
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-amber-900 text-base">{topic.analogyTitle}</h4>
          <p className="text-sm text-sky-950 leading-relaxed font-semibold">{topic.analogyContent}</p>
        </div>
      </div>

      {/* Golden Rule Card */}
      <div className="bg-emerald-500 rounded-3xl p-6 text-white shadow-lg flex items-start gap-4">
        <div className="text-3xl shrink-0 select-none">⭐</div>
        <div className="flex flex-col gap-1">
          <h4 className="font-extrabold text-white text-base">Unudulmaz Qızıl Qayda!</h4>
          <p className="text-xs text-emerald-50 leading-relaxed font-bold">
            Excel-də hər bir düstur və hesablama həmişə <span className="underline decoration-2 font-mono text-white text-sm bg-emerald-600 px-1 py-0.5 rounded">=</span> işarəsi ilə başlamalıdır! Əgər bərabərliyi yazmasan, Excel bunu adi bir yazı hesab edəcək və hesablama aparmayacaq.
          </p>
        </div>
      </div>

      {/* Formal Explanation (Simple terms) */}
      <div className="flex flex-col gap-3 bg-purple-50/50 rounded-2xl p-4 border border-purple-100/50">
        <h3 className="font-bold text-purple-950 text-sm flex items-center gap-2 bg-purple-100/60 px-3 py-1.5 rounded-xl w-fit border border-purple-200/50">
          <HelpCircle className="w-4 h-4 text-purple-600" />
          Excel dilində nə deməkdir?
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold pl-2">
          {topic.explanation}
        </p>
      </div>

      {/* Solved Examples block */}
      {topic.solvedExamples && topic.solvedExamples.length > 0 && (
        <div className="flex flex-col gap-4 border-t border-sky-100 pt-5">
          <div className="flex justify-between items-center bg-purple-50 text-purple-950 px-4 py-2.5 rounded-2xl border border-purple-100/80 w-full">
            <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-purple-600" />
              ✨ Həll edilmiş 3 nümunə:
            </h3>
          </div>

          {/* Example Selector Tabs */}
          <div className="flex gap-2 p-1.5 bg-sky-50 rounded-2xl border border-sky-100">
            {topic.solvedExamples.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => setActiveExampleIdx(idx)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                  activeExampleIdx === idx
                    ? 'bg-white text-sky-700 shadow-sm border border-sky-100 font-bold'
                    : 'text-sky-600 hover:text-sky-900 font-semibold'
                }`}
              >
                Nümunə {idx + 1}
              </button>
            ))}
          </div>

          {/* Display Selected Example */}
          {activeExample && (
            <div className="bg-sky-50/30 rounded-3xl p-5 border border-sky-100 flex flex-col gap-4 animate-fade-in shadow-xs">
              <div>
                <h4 className="font-bold text-sky-950 text-base mb-1">{activeExample.title}</h4>
                <p className="text-xs text-sky-600 font-semibold">{activeExample.description}</p>
              </div>

              {/* Solved Table Preview */}
              <div className="overflow-x-auto border border-sky-100 rounded-xl max-w-full shadow-inner bg-white">
                <table className="table-auto border-collapse w-full text-xs font-medium bg-white">
                  <thead>
                    <tr className="bg-sky-600 text-white">
                      {activeExample.tableData.headers.map((h, i) => (
                        <th key={i} className="px-4 py-2 text-left font-bold border border-sky-700">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activeExample.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-sky-50/50 border-b border-sky-50">
                        {row.map((cell, cIdx) => {
                          const isResult = cell.startsWith('=');
                          return (
                            <td
                              key={cIdx}
                              className={`px-4 py-2 border border-sky-100 font-mono ${
                                isResult ? 'bg-emerald-50 text-emerald-700 font-extrabold' : 'text-slate-700 font-semibold'
                              }`}
                            >
                              {cell}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Step-by-Step directions */}
              <div className="flex flex-col gap-2 bg-white rounded-2xl p-5 border border-sky-100 shadow-xs">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">Addım-addım necə daxil etməli?</span>
                <div className="flex flex-col gap-2 mt-1">
                  {activeExample.stepByStep.map((step, sIdx) => (
                    <div key={sIdx} className="flex gap-2.5 text-xs text-slate-700 font-medium">
                      <span className="w-5 h-5 rounded-full bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center font-bold shrink-0 text-xs">
                        {sIdx + 1}
                      </span>
                      <p className="leading-relaxed pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Result Summary footer badge */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 bg-sky-100/50 rounded-2xl p-3.5 border border-sky-200 text-xs font-bold text-sky-950">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">Yazılacaq Düstur:</span>
                  <code className="bg-rose-50 border border-rose-100 text-rose-600 px-2 py-0.5 rounded font-mono font-bold">
                    {activeExample.formulaUsed}
                  </code>
                </div>
                <div className="hidden sm:block text-slate-300">|</div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">Nəticə Xanadır:</span>
                  <code className="bg-white border border-sky-200 text-sky-600 px-2 py-0.5 rounded font-mono">
                    {activeExample.resultCell}
                  </code>
                </div>
                <div className="hidden sm:block text-slate-300">|</div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">Əldə olunan Nəticə:</span>
                  <span className="text-emerald-600 font-mono font-bold text-sm">{activeExample.resultValue}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
