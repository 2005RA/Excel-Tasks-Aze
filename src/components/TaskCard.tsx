/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Task } from '../types';
import { CheckCircle2, ChevronRight, HelpCircle, Trophy, Sparkles, Lightbulb } from 'lucide-react';

interface TaskCardProps {
  tasks: Task[];
  activeTaskIdx: number;
  solvedTasks: number[]; // array of solved task IDs
  onSelectTask: (idx: number) => void;
  onNextTask: () => void;
}

export default function TaskCard({
  tasks,
  activeTaskIdx,
  solvedTasks,
  onSelectTask,
  onNextTask,
}: TaskCardProps) {
  const activeTask = tasks[activeTaskIdx];
  const isActiveSolved = solvedTasks.includes(activeTask?.id);

  return (
    <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-5 flex flex-col gap-5 w-full">
      {/* Topic Task Selector Grid */}
      <div>
        <div className="bg-purple-50 text-purple-950 px-3 py-2 rounded-2xl border border-purple-100/80 mb-3 flex items-center gap-2 w-fit">
          <Trophy className="w-4 h-4 text-purple-600 animate-pulse" />
          <span className="text-xs font-extrabold uppercase tracking-wider">Tapşırıqlar siyahısı</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tasks.map((task, idx) => {
            const isSolved = solvedTasks.includes(task.id);
            const isActive = activeTaskIdx === idx;

            return (
              <button
                key={task.id}
                onClick={() => onSelectTask(idx)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm border transition ${
                  isActive
                    ? 'bg-sky-600 text-white border-sky-600 shadow-md scale-105'
                    : isSolved
                    ? 'bg-green-50 text-green-600 border-green-200'
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }`}
                title={task.title}
              >
                {isSolved ? '✓' : idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Task Details */}
      {activeTask && (
        <div className="bg-sky-50/30 rounded-3xl p-5 border border-sky-100/60 flex flex-col gap-4 animate-fade-in">
          <div className="flex justify-between items-start gap-2">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-bold text-sky-500 uppercase tracking-wider">Tapşırıq {activeTask.id}</span>
                <span className="text-slate-300">•</span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    activeTask.guideLevel === 'high'
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : activeTask.guideLevel === 'medium'
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      : 'bg-rose-50 text-rose-600 border border-rose-100'
                  }`}
                >
                  {activeTask.guideLevel === 'high'
                    ? 'Tam köməkli'
                    : activeTask.guideLevel === 'medium'
                    ? 'Yarım köməkli'
                    : 'Köməksiz sərbəst'}
                </span>
              </div>
              <h3 className="font-bold text-sky-950 text-base">{activeTask.title}</h3>
            </div>

            {isActiveSolved && (
              <span className="bg-green-100 text-green-800 border border-green-200 px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 shrink-0 shadow-sm animate-bounce">
                <Trophy className="w-3.5 h-3.5" />
                HƏLL EDİLDİ
              </span>
            )}
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-semibold">
            {activeTask.description}
          </p>

          {/* Guide level instructions */}
          {activeTask.guideText && (
            <div className="bg-white rounded-2xl p-3.5 border border-sky-100/80 flex gap-2.5 text-xs text-slate-600 font-medium leading-normal shadow-xs">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-sky-950 block mb-0.5">💡 Sənin üçün yol göstərici:</span>
                <p className="text-[11px] italic text-slate-600">{activeTask.guideText}</p>
              </div>
            </div>
          )}

          {/* Goal Cell Callout */}
          <div className="flex justify-between items-center bg-white border border-sky-100 rounded-xl p-3.5 shadow-xs">
            <div className="text-left">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Düstur yazılacaq hüceyrə:</span>
              <span className="font-mono font-bold text-sky-600 text-sm">{activeTask.correctFormulaCell}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Gözlənilən nəticə:</span>
              <span className="font-mono font-bold text-emerald-600 text-sm">{activeTask.correctValue}</span>
            </div>
          </div>

          {/* Next button */}
          {isActiveSolved && activeTaskIdx < tasks.length - 1 && (
            <button
              onClick={onNextTask}
              className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-2xl shadow-md shadow-sky-100 transition hover:-translate-y-0.5 mt-2 active:scale-95"
            >
              Növbəti Tapşırığa Keç
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {isActiveSolved && activeTaskIdx === tasks.length - 1 && (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-3.5 text-center flex flex-col items-center gap-1 shadow-xs">
              <Sparkles className="w-5 h-5 text-green-600" />
              <span className="font-bold text-xs">Mükəmməl! Mövzudakı bütün tapşırıqları bitirdin!</span>
              <span className="text-[10px] font-semibold text-green-600">İndi növbəti mövzu dərsinə keçə bilərsən.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
