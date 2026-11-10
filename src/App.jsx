import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_SUBJECTS } from './data/defaultSubjects';
import Header from './components/Header';
import OverallStats from './components/OverallStats';
import FilterControls from './components/FilterControls';
import SubjectCard from './components/SubjectCard';
import AddSubjectModal from './components/AddSubjectModal';
import ExamCountdownModal from './components/ExamCountdownModal';
import ResetConfirmModal from './components/ResetConfirmModal';
import { fireCelebration, fireGrandCelebration } from './utils/confetti';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'gate_cs_syllabus_v2';
const DARK_MODE_KEY = 'gate_cs_dark_mode';
const EXAM_DATE_KEY = 'gate_cs_exam_date';

export default function App() {
  // 1. Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem(DARK_MODE_KEY);
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(darkMode));
  }, [darkMode]);

  // 2. Exam Date
  const [targetDate, setTargetDate] = useState(() => {
    return localStorage.getItem(EXAM_DATE_KEY) || '2027-02-06';
  });

  const handleSaveExamDate = (newDate) => {
    setTargetDate(newDate);
    localStorage.setItem(EXAM_DATE_KEY, newDate);
  };

  // 3. Subjects & Chapters State
  const [subjects, setSubjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map(s =>
          s.id === 'programming-in-c' || s.name === 'Programming in C'
            ? { ...s, name: 'C Programming' }
            : s
        );
      }
    } catch (e) {
      console.error('Failed to parse saved subjects:', e);
    }
    return INITIAL_SUBJECTS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
  }, [subjects]);

  // 4. Expanded Subjects State (all cards collapsed by default)
  const [expandedSubjectIds, setExpandedSubjectIds] = useState(() => new Set());

  const toggleSubjectExpand = (id) => {
    setExpandedSubjectIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleExpandAll = () => {
    if (expandedSubjectIds.size === subjects.length) {
      setExpandedSubjectIds(new Set());
    } else {
      setExpandedSubjectIds(new Set(subjects.map(s => s.id)));
    }
  };

  // 5. Filters & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // 6. Modals
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Chapter Actions
  const handleAddChapter = (subjectId, title) => {
    setSubjects(prev =>
      prev.map(subject => {
        if (subject.id !== subjectId) return subject;
        const newChapter = {
          id: `chap-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          title,
          completed: false,
          revisionCount: 0,
          createdAt: new Date().toISOString()
        };
        return {
          ...subject,
          chapters: [...(subject.chapters || []), newChapter]
        };
      })
    );
  };

  const handleToggleChapter = (subjectId, chapterId) => {
    setSubjects(prev =>
      prev.map(subject => {
        if (subject.id !== subjectId) return subject;

        let willBeCompleted = false;
        const updatedChapters = (subject.chapters || []).map(chap => {
          if (chap.id === chapterId) {
            willBeCompleted = !chap.completed;
            return {
              ...chap,
              completed: !chap.completed,
              completedAt: !chap.completed ? new Date().toISOString() : null
            };
          }
          return chap;
        });

        if (willBeCompleted) {
          const total = updatedChapters.length;
          const completedCount = updatedChapters.filter(c => c.completed).length;

          if (total > 0 && completedCount === total) {
            fireGrandCelebration();
            showToast(`🎉 Outstanding! You completed 100% of ${subject.name}!`);
          } else {
            fireCelebration();
          }
        }

        return {
          ...subject,
          chapters: updatedChapters
        };
      })
    );
  };

  const handleDeleteChapter = (subjectId, chapterId) => {
    setSubjects(prev =>
      prev.map(subject => {
        if (subject.id !== subjectId) return subject;
        return {
          ...subject,
          chapters: (subject.chapters || []).filter(c => c.id !== chapterId)
        };
      })
    );
  };

  const handleEditChapter = (subjectId, chapterId, newTitle) => {
    setSubjects(prev =>
      prev.map(subject => {
        if (subject.id !== subjectId) return subject;
        return {
          ...subject,
          chapters: (subject.chapters || []).map(chap =>
            chap.id === chapterId ? { ...chap, title: newTitle } : chap
          )
        };
      })
    );
  };

  const handleIncrementRevision = (subjectId, chapterId) => {
    setSubjects(prev =>
      prev.map(subject => {
        if (subject.id !== subjectId) return subject;
        return {
          ...subject,
          chapters: (subject.chapters || []).map(chap =>
            chap.id === chapterId
              ? { ...chap, revisionCount: (chap.revisionCount || 0) + 1 }
              : chap
          )
        };
      })
    );
  };

  // Subject Actions
  const handleAddSubject = (newSub) => {
    setSubjects(prev => [...prev, newSub]);
    setExpandedSubjectIds(prev => new Set([...prev, newSub.id]));
    showToast(`Added "${newSub.name}"`);
  };

  const handleDeleteSubject = (subjectId) => {
    setSubjects(prev => prev.filter(s => s.id !== subjectId));
    showToast(`Removed custom subject`);
  };

  // Backup & Restore
  const handleExportData = () => {
    const dataStr = JSON.stringify({ subjects, targetDate }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gate_cs_syllabus_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Backup downloaded successfully!');
  };

  const handleImportData = (importedData) => {
    if (importedData && Array.isArray(importedData.subjects)) {
      setSubjects(importedData.subjects);
      if (importedData.targetDate) {
        setTargetDate(importedData.targetDate);
        localStorage.setItem(EXAM_DATE_KEY, importedData.targetDate);
      }
      showToast('Syllabus data restored successfully!');
    } else if (Array.isArray(importedData)) {
      setSubjects(importedData);
      showToast('Syllabus data restored successfully!');
    } else {
      alert('Invalid file format. Could not restore syllabus.');
    }
  };

  const handleClearCompletionOnly = () => {
    setSubjects(prev =>
      prev.map(subject => ({
        ...subject,
        chapters: (subject.chapters || []).map(chap => ({
          ...chap,
          completed: false,
          revisionCount: 0
        }))
      }))
    );
    setIsResetModalOpen(false);
    showToast('Reset all chapter checkboxes to incomplete.');
  };

  const handleConfirmResetAll = () => {
    setSubjects(INITIAL_SUBJECTS);
    setExpandedSubjectIds(new Set());
    setIsResetModalOpen(false);
    showToast('Reset back to default 15 subjects.');
  };

  // Filter & Sort Logic
  const filteredAndSortedSubjects = useMemo(() => {
    let list = [...subjects];

    // Category filter
    if (selectedCategory !== 'All') {
      list = list.filter(s => s.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(s => {
        const matchesSubject = s.name.toLowerCase().includes(q);
        const matchesChapter = (s.chapters || []).some(c =>
          c.title.toLowerCase().includes(q)
        );
        return matchesSubject || matchesChapter;
      });
    }

    // Sort
    if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'progress-asc') {
      list.sort((a, b) => {
        const pctA = a.chapters?.length ? (a.chapters.filter(c => c.completed).length / a.chapters.length) : 0;
        const pctB = b.chapters?.length ? (b.chapters.filter(c => c.completed).length / b.chapters.length) : 0;
        return pctA - pctB;
      });
    } else if (sortBy === 'progress-desc') {
      list.sort((a, b) => {
        const pctA = a.chapters?.length ? (a.chapters.filter(c => c.completed).length / a.chapters.length) : 0;
        const pctB = b.chapters?.length ? (b.chapters.filter(c => c.completed).length / b.chapters.length) : 0;
        return pctB - pctA;
      });
    } else if (sortBy === 'chapters-count') {
      list.sort((a, b) => (b.chapters?.length || 0) - (a.chapters?.length || 0));
    }

    return list;
  }, [subjects, selectedCategory, searchQuery, sortBy]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-[#0b0f19] text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 dark:border-slate-300 text-sm animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        targetDate={targetDate}
        onOpenDateModal={() => setIsDateModalOpen(true)}
        onExportData={handleExportData}
        onImportData={handleImportData}
        onResetAll={() => setIsResetModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Overall Syllabus Completion Stats */}
        <OverallStats subjects={subjects} />

        {/* Controls: Search, Sort, Filters, Actions */}
        <FilterControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          allExpanded={expandedSubjectIds.size === subjects.length}
          onToggleExpandAll={handleToggleExpandAll}
          onOpenAddSubject={() => setIsAddSubjectOpen(true)}
        />

        {/* Subjects List */}
        {filteredAndSortedSubjects.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <p className="text-base text-slate-600 dark:text-slate-400">
              No subjects or chapters match your current search/filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
            {filteredAndSortedSubjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                isExpanded={expandedSubjectIds.has(subject.id)}
                onToggleExpand={() => toggleSubjectExpand(subject.id)}
                onAddChapter={handleAddChapter}
                onToggleChapter={handleToggleChapter}
                onDeleteChapter={handleDeleteChapter}
                onEditChapter={handleEditChapter}
                onIncrementRevision={handleIncrementRevision}
                onDeleteSubject={handleDeleteSubject}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <AddSubjectModal
        isOpen={isAddSubjectOpen}
        onClose={() => setIsAddSubjectOpen(false)}
        onAddSubject={handleAddSubject}
      />

      <ExamCountdownModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        targetDate={targetDate}
        onSaveDate={handleSaveExamDate}
      />

      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmReset={handleConfirmResetAll}
        onClearCompletionOnly={handleClearCompletionOnly}
      />
    </div>
  );
}
