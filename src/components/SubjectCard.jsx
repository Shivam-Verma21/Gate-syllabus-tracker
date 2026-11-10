import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Circle,
  FileText,
  RotateCw,
  MoreVertical
} from 'lucide-react';
import { getSubjectIcon } from '../utils/iconMap';
import { getTheme } from '../utils/themeColors';

export default function SubjectCard({
  subject,
  isExpanded,
  onToggleExpand,
  onAddChapter,
  onToggleChapter,
  onDeleteChapter,
  onEditChapter,
  onIncrementRevision,
  onDeleteSubject
}) {
  const [newChapterTitle, setNewChapterTitle] = useState('');
  const [showMultiLine, setShowMultiLine] = useState(false);
  const [multiLineText, setMultiLineText] = useState('');
  const [editingChapterId, setEditingChapterId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const theme = getTheme(subject.color);
  const chapters = subject.chapters || [];
  const completedCount = chapters.filter(c => c.completed).length;
  const totalCount = chapters.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Single chapter submission
  const handleAddSingle = (e) => {
    e.preventDefault();
    if (!newChapterTitle.trim()) return;
    onAddChapter(subject.id, newChapterTitle.trim());
    setNewChapterTitle('');
  };

  // Bulk paste chapters
  const handleAddMultiLine = (e) => {
    e.preventDefault();
    if (!multiLineText.trim()) return;
    const lines = multiLineText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    lines.forEach(title => {
      onAddChapter(subject.id, title);
    });
    setMultiLineText('');
    setShowMultiLine(false);
  };

  const startEditing = (chap) => {
    setEditingChapterId(chap.id);
    setEditTitle(chap.title);
  };

  const saveEdit = (chapId) => {
    if (editTitle.trim()) {
      onEditChapter(subject.id, chapId, editTitle.trim());
    }
    setEditingChapterId(null);
  };

  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md ${
        percentage === 100 && totalCount > 0
          ? 'border-emerald-300 dark:border-emerald-800/80'
          : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      {/* Subject Header / Clickable Accordion Bar */}
      <div
        className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
        onClick={onToggleExpand}
      >
        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1 pr-2">
          {/* Subject Icon */}
          <div
            className={`p-2.5 rounded-xl flex-shrink-0 ${theme.badge} border`}
          >
            {getSubjectIcon(subject.icon, "w-5 h-5")}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base sm:text-lg truncate">
                {subject.name}
              </h3>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${theme.badge}`}>
                {subject.category}
              </span>
            </div>

            {/* Subtitle / Progress numbers */}
            <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>
                {totalCount === 0
                  ? 'No chapters added yet'
                  : `${completedCount} of ${totalCount} completed`}
              </span>
              {totalCount > 0 && (
                <>
                  <span>•</span>
                  <span className={`font-semibold ${percentage === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    {percentage}%
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right side: Mini Progress & Expand Icon */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          {totalCount > 0 && (
            <div className="hidden sm:block w-24 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  percentage === 100 ? 'bg-emerald-500' : theme.bar
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          )}

          <div className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Progress Bar (Full width across top of card content) */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 overflow-hidden">
        <div
          className={`h-1 transition-all duration-500 ${
            percentage === 100 ? 'bg-emerald-500' : theme.bar
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Expanded Content: Add chapter input + Chapter Todo List */}
      {isExpanded && (
        <div className="p-4 sm:p-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/40">
          {/* Add Chapter Form */}
          <div className="mb-4">
            {!showMultiLine ? (
              <form onSubmit={handleAddSingle} className="flex gap-2">
                <input
                  type="text"
                  value={newChapterTitle}
                  onChange={(e) => setNewChapterTitle(e.target.value)}
                  placeholder={`Add a chapter to ${subject.name}... (e.g. Graph Theory)`}
                  className="flex-1 px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!newChapterTitle.trim()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium flex items-center space-x-1 shadow-sm transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowMultiLine(true)}
                  title="Paste multiple chapters at once"
                  className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-medium transition"
                >
                  Bulk Add
                </button>
              </form>
            ) : (
              <form onSubmit={handleAddMultiLine} className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Paste multiple chapters (one chapter per line):
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowMultiLine(false)}
                    className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    Cancel
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={multiLineText}
                  onChange={(e) => setMultiLineText(e.target.value)}
                  placeholder={`Propositional Logic\nSets and Relations\nGraph Theory\nRecurrence Relations`}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-sans"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowMultiLine(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!multiLineText.trim()}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-medium rounded-lg shadow-sm"
                  >
                    Add Chapters
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Chapters List */}
          {chapters.length === 0 ? (
            <div className="text-center py-6 px-4 bg-white/50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                No chapters added to <span className="font-semibold text-slate-700 dark:text-slate-300">{subject.name}</span> yet.
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Type a chapter name above and press <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border text-[10px]">Enter</kbd> to add it!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {chapters.map((chap) => {
                const isEditing = editingChapterId === chap.id;

                return (
                  <div
                    key={chap.id}
                    className={`group flex items-center justify-between p-2.5 sm:p-3 rounded-xl border transition-all ${
                      chap.completed
                        ? 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800/60'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700/80 shadow-xs'
                    }`}
                  >
                    {/* Left: Checkbox + Title */}
                    <div className="flex items-center space-x-3 min-w-0 flex-1 pr-2">
                      {/* Checkbox */}
                      <button
                        type="button"
                        onClick={() => onToggleChapter(subject.id, chap.id)}
                        className={`flex-shrink-0 transition-transform active:scale-90 ${
                          chap.completed
                            ? 'text-emerald-500 hover:text-emerald-600'
                            : 'text-slate-400 hover:text-indigo-600 dark:text-slate-500 dark:hover:text-indigo-400'
                        }`}
                        title={chap.completed ? 'Mark chapter as incomplete' : 'Mark chapter as done'}
                      >
                        {chap.completed ? (
                          <CheckCircle className="w-5 h-5 fill-emerald-100 dark:fill-emerald-950/80" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>

                      {/* Title or Edit Input */}
                      {isEditing ? (
                        <div className="flex items-center space-x-2 flex-1">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveEdit(chap.id);
                              if (e.key === 'Escape') setEditingChapterId(null);
                            }}
                            autoFocus
                            className="flex-1 px-2.5 py-1 text-sm bg-white dark:bg-slate-900 border border-indigo-400 rounded-lg text-slate-900 dark:text-white focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => saveEdit(chap.id)}
                            className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-700 rounded"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingChapterId(null)}
                            className="p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span
                          onClick={() => onToggleChapter(subject.id, chap.id)}
                          className={`text-sm cursor-pointer select-none transition-all truncate ${
                            chap.completed
                              ? 'line-through text-slate-400 dark:text-slate-500'
                              : 'text-slate-800 dark:text-slate-200 font-medium hover:text-indigo-600 dark:hover:text-indigo-400'
                          }`}
                        >
                          {chap.title}
                        </span>
                      )}
                    </div>

                    {/* Right: Revision count & Action buttons */}
                    <div className="flex items-center space-x-1 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                      {/* Revision badge counter */}
                      <button
                        type="button"
                        onClick={() => onIncrementRevision(subject.id, chap.id)}
                        title={`Revisions completed: ${chap.revisionCount || 0}. Click to increment.`}
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center space-x-1 transition ${
                          (chap.revisionCount || 0) > 0
                            ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                            : 'bg-slate-100 text-slate-500 dark:bg-slate-700/50 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Rev {chap.revisionCount || 0}</span>
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => startEditing(chap)}
                        className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                        title="Edit chapter title"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => onDeleteChapter(subject.id, chap.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded hover:bg-rose-50 dark:hover:bg-slate-700 transition"
                        title="Delete chapter"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Delete Custom Subject option if it's a custom subject */}
          {subject.isCustom && (
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => onDeleteSubject(subject.id)}
                className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Subject</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
