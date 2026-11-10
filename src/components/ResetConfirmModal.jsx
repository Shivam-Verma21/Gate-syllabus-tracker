import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ResetConfirmModal({ isOpen, onClose, onConfirmReset, onClearCompletionOnly }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-rose-600">
            <AlertTriangle className="w-6 h-6" />
            <h3 className="text-lg font-bold">Reset Options</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
          Choose how you would like to reset:
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={onClearCompletionOnly}
            className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50/50 dark:bg-slate-800/50 transition group"
          >
            <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Uncheck all chapters only
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Keep all your chapters and subjects, but reset completion checkboxes to 0%.
            </div>
          </button>

          <button
            type="button"
            onClick={onConfirmReset}
            className="w-full text-left p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 bg-rose-50/20 transition group"
          >
            <div className="font-semibold text-rose-700 dark:text-rose-400 text-sm">
              Reset entire syllabus back to initial empty subjects
            </div>
            <div className="text-xs text-rose-600/80 dark:text-rose-400/80 mt-0.5">
              Warning: This clears all chapters you have created and resets to the default 15 subjects.
            </div>
          </button>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
