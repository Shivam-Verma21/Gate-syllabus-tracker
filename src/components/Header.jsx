import React, { useState, useRef, useEffect } from 'react';
import {
  GraduationCap,
  Sun,
  Moon,
  Download,
  Upload,
  RotateCcw,
  Calendar,
  Settings,
  MoreVertical
} from 'lucide-react';

export default function Header({
  darkMode,
  setDarkMode,
  targetDate,
  onOpenDateModal,
  onExportData,
  onImportData,
  onResetAll
}) {
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Calculate days remaining
  const getDaysRemaining = () => {
    if (!targetDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          onImportData(parsed);
        } catch (err) {
          alert('Invalid JSON file format. Please upload a valid backup.');
        }
      };
      reader.readAsText(file);
    }
    setIsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Logo & Title */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <div className="p-2 sm:p-2.5 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl shadow-md text-white flex-shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <h1 className="text-sm sm:text-xl font-bold bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-indigo-200 dark:to-slate-200 bg-clip-text text-transparent truncate">
                  GATE CS Tracker
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                  CS & IT
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block truncate">
                Add chapters, mark them done & monitor overall syllabus completion
              </p>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 flex-shrink-0">
            {/* Days Countdown Pill */}
            <button
              onClick={onOpenDateModal}
              title="Click to change target exam date"
              className="flex items-center space-x-1 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/50 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500 flex-shrink-0" />
              <span>
                {daysRemaining !== null ? (
                  <>
                    <span className="inline sm:hidden">
                      {daysRemaining >= 0 ? `${daysRemaining}d` : `${Math.abs(daysRemaining)}d ago`}
                    </span>
                    <span className="hidden sm:inline">
                      {daysRemaining >= 0 ? `${daysRemaining} days left` : `${Math.abs(daysRemaining)} days ago`}
                    </span>
                  </>
                ) : (
                  'Exam Date'
                )}
              </span>
              <Settings className="w-3 h-3 ml-0.5 opacity-70 hidden sm:inline" />
            </button>

            {/* Hidden File Input for Restore */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            >
              {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Unified Options Dropdown (Backup, Restore, Reset) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                title="Backup, Restore & Reset Options"
                className={`p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 border transition ${isDropdownOpen
                    ? 'bg-slate-100 dark:bg-slate-800 border-indigo-300 dark:border-indigo-700'
                    : 'border-transparent'
                  }`}
              >
                <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 sm:w-60 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 mb-1">
                    Data & Syllabus
                  </div>

                  {/* Backup / Export */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onExportData();
                    }}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    <Download className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Backup Progress</div>
                      <div className="text-[11px] text-slate-400 dark:text-slate-500">Download JSON file</div>
                    </div>
                  </button>

                  {/* Restore / Import */}
                  <button
                    type="button"
                    onClick={() => {
                      fileInputRef.current?.click();
                    }}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    <Upload className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Restore Backup</div>
                      <div className="text-[11px] text-slate-400 dark:text-slate-500">Load from JSON file</div>
                    </div>
                  </button>

                  <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                  {/* Reset Options */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onResetAll();
                    }}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 text-left text-xs sm:text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                  >
                    <RotateCcw className="w-4 h-4 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Reset Progress</div>
                      <div className="text-[11px] text-rose-500/70">Uncheck all or restore subjects</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
