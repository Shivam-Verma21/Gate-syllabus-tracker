import React from 'react';
import {
  CheckCircle2,
  BookOpen,
  TrendingUp,
  Clock,
  Sparkles,
  PieChart
} from 'lucide-react';

export default function OverallStats({ subjects }) {
  // Aggregate stats
  let totalChapters = 0;
  let completedChapters = 0;

  const categoryStats = {
    "Engineering Mathematics": { total: 0, completed: 0 },
    "Core Computer Science": { total: 0, completed: 0 },
    "General Aptitude": { total: 0, completed: 0 }
  };

  subjects.forEach(subject => {
    const chapCount = subject.chapters?.length || 0;
    const compCount = subject.chapters?.filter(c => c.completed)?.length || 0;

    totalChapters += chapCount;
    completedChapters += compCount;

    const cat = subject.category || "Core Computer Science";
    if (!categoryStats[cat]) {
      categoryStats[cat] = { total: 0, completed: 0 };
    }
    categoryStats[cat].total += chapCount;
    categoryStats[cat].completed += compCount;
  });

  const overallPercentage = totalChapters > 0
    ? Math.round((completedChapters / totalChapters) * 100)
    : 0;

  const getStatusQuote = (pct, total) => {
    if (total === 0) return "Add your first chapters in the subjects below to start tracking!";
    if (pct === 0) return "Ready to start? Check off your completed topics as you study!";
    if (pct < 25) return "Great start! Consistency is the key to cracking GATE CS.";
    if (pct < 50) return "Good momentum! Keep chipping away at every subject.";
    if (pct < 75) return "Over half-way! You're building a massive competitive advantage.";
    if (pct < 100) return "Final stretch! Revise formulas and practice PYQs diligently.";
    return "Outstanding! Full syllabus completed! You are ready to ace GATE CS!";
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-5 sm:p-7 mb-8 transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Main Progress Circle & Percentage */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0 text-center sm:text-left">
          {/* Circular Gauge */}
          <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-100 dark:text-slate-800"
                fill="transparent"
              />
              {/* Foreground circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * overallPercentage) / 100}
                strokeLinecap="round"
                className="text-indigo-600 dark:text-indigo-500 transition-all duration-700 ease-out"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-800 dark:text-white">
                {overallPercentage}%
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Overall
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 justify-center sm:justify-start">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Syllabus Status
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              {completedChapters} of {totalChapters} Chapters Done
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
              {getStatusQuote(overallPercentage, totalChapters)}
            </p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Engineering Mathematics */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="font-medium truncate">Engg. Maths</span>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {categoryStats["Engineering Mathematics"].total > 0
                  ? `${Math.round((categoryStats["Engineering Mathematics"].completed / categoryStats["Engineering Mathematics"].total) * 100)}%`
                  : '0%'}
              </span>
            </div>
            <div className="text-lg font-bold text-slate-800 dark:text-slate-100">
              {categoryStats["Engineering Mathematics"].completed} / {categoryStats["Engineering Mathematics"].total}
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: `${categoryStats["Engineering Mathematics"].total > 0
                    ? (categoryStats["Engineering Mathematics"].completed / categoryStats["Engineering Mathematics"].total) * 100
                    : 0}%`
                }}
              />
            </div>
          </div>

          {/* Core Computer Science */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="font-medium truncate">Core CS</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {categoryStats["Core Computer Science"].total > 0
                  ? `${Math.round((categoryStats["Core Computer Science"].completed / categoryStats["Core Computer Science"].total) * 100)}%`
                  : '0%'}
              </span>
            </div>
            <div className="text-lg font-bold text-slate-800 dark:text-slate-100">
              {categoryStats["Core Computer Science"].completed} / {categoryStats["Core Computer Science"].total}
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: `${categoryStats["Core Computer Science"].total > 0
                    ? (categoryStats["Core Computer Science"].completed / categoryStats["Core Computer Science"].total) * 100
                    : 0}%`
                }}
              />
            </div>
          </div>

          {/* General Aptitude */}
          <div className="col-span-2 sm:col-span-1 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span className="font-medium truncate">Aptitude</span>
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                {categoryStats["General Aptitude"].total > 0
                  ? `${Math.round((categoryStats["General Aptitude"].completed / categoryStats["General Aptitude"].total) * 100)}%`
                  : '0%'}
              </span>
            </div>
            <div className="text-lg font-bold text-slate-800 dark:text-slate-100">
              {categoryStats["General Aptitude"].completed} / {categoryStats["General Aptitude"].total}
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: `${categoryStats["General Aptitude"].total > 0
                    ? (categoryStats["General Aptitude"].completed / categoryStats["General Aptitude"].total) * 100
                    : 0}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
