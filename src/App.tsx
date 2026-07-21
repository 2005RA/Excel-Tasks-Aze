/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { workbookTopics, workbookAnswers } from './data/workbookData';
import { Topic } from './types';
import LessonView from './components/LessonView';
import TaskCard from './components/TaskCard';
import ExcelGrid from './components/ExcelGrid';
import { generateWorkbookDocx } from './utils/docxGenerator';
import {
  FileText,
  Sparkles,
  Download,
  CheckCircle2,
  Trophy,
  Palette,
  Binary,
  Percent,
  Sigma,
  Plus,
  ChevronDown,
  BarChart3,
  HelpCircle,
  MessageCircle,
  BookOpen,
} from 'lucide-react';

export default function App() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('addition');
  const [activeTaskIdx, setActiveTaskIdx] = useState<number>(0);
  const [solvedTasksState, setSolvedTasksState] = useState<{ [topicId: string]: number[] }>({});
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'answers'>('learn');

  // Chatbot states
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'mascot' | 'user'; text: string }>>([
    {
      sender: 'mascot',
      text: 'Salam! Səninlə Excel öyrənmək üçün çox həyəcanlıyam! 🐼 Mən sənə "Sehrli Səbət" (SUM) və ya "Balaca Dedektiv" (COUNT) haqqında danışa bilərəm. Məndən nə soruşmaq istəyirsən?',
    },
  ]);

  const activeTopic = workbookTopics.find((t) => t.id === selectedTopicId) || workbookTopics[0];

  // Reset active task idx when topic changes
  useEffect(() => {
    setActiveTaskIdx(0);
    setActiveTab('learn'); // Reset to learn tab when topic changes
  }, [selectedTopicId]);

  // Handle successful task solution
  const handleTaskSolved = () => {
    const activeTaskId = activeTopic.tasks[activeTaskIdx]?.id;
    if (!activeTaskId) return;

    setSolvedTasksState((prev) => {
      const currentSolved = prev[selectedTopicId] || [];
      if (currentSolved.includes(activeTaskId)) return prev;
      return {
        ...prev,
        [selectedTopicId]: [...currentSolved, activeTaskId],
      };
    });
  };

  const handleNextTask = () => {
    if (activeTaskIdx < activeTopic.tasks.length - 1) {
      setActiveTaskIdx((prev) => prev + 1);
    }
  };

  // Trigger Word document generation and download
  const handleDownloadDocx = async () => {
    setIsDownloading(true);
    try {
      const blob = await generateWorkbookDocx();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Excel_Sehrli_Dunyasi_Oyrenme_Kitabcasi.docx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating document:', error);
      alert('Sənəd yaradılarkən xəta baş verdi. Zəhmət olmasa yenidən yoxlayın.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Quick chatbot preset triggers
  const handleMascotResponse = (question: string, answer: string) => {
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: question },
      { sender: 'mascot', text: answer },
    ]);
  };

  // Topic Icons mapping
  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plus':
        return <Plus className="w-4 h-4" />;
      case 'Sigma':
        return <Sigma className="w-4 h-4" />;
      case 'Percent':
        return <Percent className="w-4 h-4" />;
      case 'Binary':
        return <Binary className="w-4 h-4" />;
      case 'ChevronDown':
        return <ChevronDown className="w-4 h-4" />;
      case 'Palette':
        return <Palette className="w-4 h-4" />;
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-sky-50/50 text-slate-800 font-sans flex flex-col pb-12 antialiased">
      {/* Header Banner */}
      <header className="bg-white border-b-2 border-sky-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-100">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-sky-950 tracking-tight flex items-center gap-2">
                Excel Sehrli Dünyası
              </h1>
              <p className="text-xs font-semibold text-sky-500">10 Yaşlı Şagirdlər üçün İnteraktiv Kitabça</p>
            </div>
          </div>

          {/* Student Badges */}
          <div className="flex gap-2 items-center">
            <span className="px-3.5 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold border border-amber-200">Səviyyə: Başlanğıc</span>
            <span className="px-3.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-200 uppercase tracking-tighter italic">Tələbə: 10 Yaş</span>
          </div>

          {/* DOCX Export Button */}
          <button
            onClick={handleDownloadDocx}
            disabled={isDownloading}
            className={`flex items-center gap-2 font-extrabold text-sm px-5 py-3 rounded-2xl shadow-md transition-all ${
              isDownloading
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-sky-600 hover:bg-sky-700 text-white hover:-translate-y-0.5 shadow-sky-100'
            }`}
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'Sənəd Hazırlanır...' : 'Mətn Sənədini Yüklə (.docx)'}
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="max-w-7xl mx-auto px-4 mt-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Sidebar navigation list of topics */}
        <nav className="lg:col-span-3 bg-white border border-sky-100 rounded-3xl p-5 shadow-sm flex flex-col gap-4">
          <div>
            <div className="bg-purple-50 text-purple-950 px-3 py-2 rounded-2xl border border-purple-100/80 mb-3 flex items-center gap-2 w-fit ml-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider">Dərs Mövzuları</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {workbookTopics.map((topic) => {
                const isSelected = selectedTopicId === topic.id;
                const solvedCount = solvedTasksState[topic.id]?.length || 0;
                const totalCount = topic.tasks.length;
                const isAllSolved = solvedCount === totalCount && totalCount > 0;

                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`flex items-center justify-between px-3 py-3 rounded-2xl font-bold text-xs transition border text-left ${
                      isSelected
                        ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-100'
                        : 'bg-white text-sky-700 border-transparent hover:bg-sky-50/50 hover:text-sky-950'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div
                        className={`p-1.5 rounded-xl shrink-0 ${
                          isSelected ? 'bg-sky-500 text-white' : 'bg-sky-50 text-sky-600'
                        }`}
                      >
                        {getTopicIcon(topic.iconName)}
                      </div>
                      <span className="truncate">{topic.title}</span>
                    </div>

                    {/* Progress Badge */}
                    {totalCount > 0 && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-xl font-extrabold ${
                          isSelected
                            ? 'bg-sky-500 text-white'
                            : isAllSolved
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-sky-50 text-sky-600 border border-sky-100/50'
                        }`}
                      >
                        {isAllSolved ? '✓' : `${solvedCount}/${totalCount}`}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Answers Explorer tab shortcut */}
          <div className="border-t border-sky-100 pt-3">
            <button
              onClick={() => setActiveTab('answers')}
              className={`w-full flex items-center justify-center gap-2 px-3 py-3 rounded-2xl font-bold text-xs transition border ${
                activeTab === 'answers'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-100'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              Bütün Cavabları Göstər 🔑
            </button>
          </div>
        </nav>

        {/* Right Side: Active Workspace (Tabs: Learn, Practice, Answers) */}
        <div className="lg:col-span-9 flex flex-col gap-6 w-full">
          {/* Workspace Tab bar */}
          <div className="flex gap-2 p-1.5 bg-white border border-sky-100 rounded-3xl shadow-sm">
            <button
              onClick={() => setActiveTab('learn')}
              className={`flex-1 py-3 text-sm font-bold rounded-2xl transition ${
                activeTab === 'learn'
                  ? 'bg-sky-100 text-sky-800 border border-sky-200/50 shadow-xs'
                  : 'text-slate-500 hover:text-sky-700 hover:bg-sky-50/50'
              }`}
            >
              📚 Öyrən (Dərslik)
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex-1 py-3 text-sm font-bold rounded-2xl transition ${
                activeTab === 'practice'
                  ? 'bg-sky-100 text-sky-800 border border-sky-200/50 shadow-xs'
                  : 'text-slate-500 hover:text-sky-700 hover:bg-sky-50/50'
              }`}
            >
              ✏️ Çalış (İnteraktiv Simulyator)
            </button>
            <button
              onClick={() => setActiveTab('answers')}
              className={`flex-1 py-3 text-sm font-bold rounded-2xl transition ${
                activeTab === 'answers'
                  ? 'bg-sky-100 text-sky-800 border border-sky-200/50 shadow-xs'
                  : 'text-slate-500 hover:text-sky-700 hover:bg-sky-50/50'
              }`}
            >
              🔑 Cavablar (Müəllim üçün)
            </button>
          </div>

          {/* Conditional content render based on active tab */}
          {activeTab === 'learn' && (
            <LessonView topic={activeTopic} onGoToTasks={() => setActiveTab('practice')} />
          )}

          {activeTab === 'practice' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full items-start">
              {/* Task descriptions and guide selector */}
              <div className="md:col-span-4 w-full flex flex-col gap-6">
                <TaskCard
                  tasks={activeTopic.tasks}
                  activeTaskIdx={activeTaskIdx}
                  solvedTasks={solvedTasksState[selectedTopicId] || []}
                  onSelectTask={(idx) => setActiveTaskIdx(idx)}
                  onNextTask={handleNextTask}
                />
              </div>

              {/* Interactive Excel Grid */}
              <div className="md:col-span-8 w-full">
                <ExcelGrid
                  currentTask={activeTopic.tasks[activeTaskIdx] || activeTopic.tasks[0]}
                  onSolveSuccess={handleTaskSolved}
                />
              </div>
            </div>
          )}

          {activeTab === 'answers' && (
            <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 w-full flex flex-col gap-6 animate-fade-in">
              <div className="bg-purple-50 text-purple-950 px-5 py-4 rounded-2xl border border-purple-100/80 mb-1 flex items-center gap-3 w-full">
                <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl border border-purple-200/50">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-purple-600 uppercase tracking-wider block">Düzgün Həllər</span>
                  <h2 className="text-lg sm:text-xl font-extrabold">Bütün Tapşırıqların Cavabları</h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Bu bölmədə dərslikdəki 10-luq tapşırıqların (sadə toplama, SUM, AVERAGE, COUNT) düstur və cavablarının rəsmi siyahısı təqdim olunur.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {workbookTopics
                  .filter((t) => t.isCalculation)
                  .map((topic) => {
                    const ansList = workbookAnswers[topic.id as keyof typeof workbookAnswers] || [];

                    return (
                      <div key={topic.id} className="bg-sky-50 rounded-2xl p-5 border border-sky-100">
                        <h4 className="font-extrabold text-slate-800 text-sm mb-3 pb-2 border-b border-sky-200 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          {topic.title}
                        </h4>

                        <div className="flex flex-col gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                          {ansList.map((ans) => (
                             <div key={ans.task} className="flex justify-between items-center text-xs font-semibold bg-white p-2.5 rounded-xl border border-sky-100 shadow-xs">
                              <span className="text-slate-500">Tapşırıq {ans.task}:</span>
                              <div className="flex items-center gap-2">
                                <code className="bg-rose-50 text-rose-600 font-mono px-1.5 py-0.5 rounded border border-rose-100 text-[10px]">
                                  {ans.formula}
                                </code>
                                <span className="text-slate-300">|</span>
                                <span className="text-emerald-600 font-mono font-bold">{ans.value}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Floating Mascot Panda Chat Helper */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 max-w-sm">
        {/* Chat window */}
        {isChatOpen && (
          <div className="bg-white rounded-3xl border border-sky-100 shadow-2xl flex flex-col w-[320px] sm:w-[360px] h-[400px] overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="bg-sky-600 text-white px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl select-none">🐼</span>
                <div>
                  <h4 className="font-bold text-xs">Panda Köməkçi</h4>
                  <span className="text-[10px] text-sky-100 font-bold block">İnteraktiv Excel Bələdçisi</span>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-sky-50/30">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
                >
                  {msg.sender === 'mascot' && <span className="text-xl mt-1 select-none">🐼</span>}
                  <div
                    className={`rounded-2xl p-3 text-xs leading-relaxed font-semibold shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-sky-600 text-white rounded-tr-none'
                        : 'bg-white text-sky-950 rounded-tl-none border border-sky-100'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Presets */}
            <div className="bg-white border-t border-sky-100 p-3 flex flex-col gap-1.5 shrink-0">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Pandadan soruş:</span>
              <div className="flex flex-col gap-1 max-h-[100px] overflow-y-auto">
                {[
                  {
                    q: 'SUM (Cəm) nədir?',
                    a: 'SUM - sənin bütün topları yığıb cəmləyən "Sehrli Səbətindir"! Aralarında iki nöqtə olan xanaları (məs. =SUM(B2:B6)) daxil etsən, Excel o aralıqdakı hər şeyi dərhal cəmləyər! 🧺',
                  },
                  {
                    q: 'COUNT (Say) nəyə kömək edir?',
                    a: 'COUNT bir "Balaca Dedektivdir"! O, sənin seçdiyin rəflərdə yalnız İÇİNDƏ ƏDƏD OLAN qutuları sayır. Mətn və ya boş yerləri saymır! 🕵️‍♂️',
                  },
                  {
                    q: 'AVERAGE (Ədədi orta) nədir?',
                    a: 'AVERAGE dostların arasında şokoladları "Bərabər Bölməkdir"! O, bütün rəqəmləri toplayır, sonra isə sayına bölərək sənə ortalama (ədalətli) payı göstərir! 🍫',
                  },
                  {
                    q: 'Sürükləmə nə üçün lazımdır?',
                    a: 'Sağ alt küncdəki balaca mavi kvadrat sənin "Sehrli Quyruğundur"! Ondan tutub aşağı çəksən, eyni düsturları təkrar yazmadan bütün sətirlərə sürətlə yaya bilərsən! 🚀',
                  },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleMascotResponse(item.q, item.a)}
                    className="text-left bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-[10px] px-2.5 py-1.5 rounded-xl border border-sky-100 transition truncate"
                  >
                    {item.q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mascot Toggle Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-sky-600 hover:bg-sky-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:-translate-y-1 transition-all group shrink-0 relative"
          title="Pandadan Excel soruş"
        >
          <span className="text-3xl select-none group-hover:scale-110 transition-transform">🐼</span>
          <div className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full border-2 border-white animate-ping" />
        </button>
      </div>
    </div>
  );
}
