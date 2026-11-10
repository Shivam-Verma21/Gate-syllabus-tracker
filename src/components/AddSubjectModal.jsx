import React, { useState } from 'react';
import { X, Plus, BookOpen } from 'lucide-react';

export default function AddSubjectModal({ isOpen, onClose, onAddSubject }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Core Computer Science');
  const [color, setColor] = useState('indigo');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddSubject({
      id: `custom-${Date.now()}`,
      name: name.trim(),
      category,
      color,
      icon: 'BookOpen',
      isCustom: true,
      chapters: []
    });

    setName('');
    onClose();
  };

  const colors = [
    'indigo', 'blue', 'cyan', 'teal', 'emerald', 'green', 'amber', 'orange', 'rose', 'purple', 'violet'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Plus className="w-5 h-5 text-indigo-600" />
            <span>Add Custom Subject</span>
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Subject Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Mock Test Analysis or Advanced Algorithms"
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Core Computer Science">Core Computer Science</option>
              <option value="Engineering Mathematics">Engineering Mathematics</option>
              <option value="General Aptitude">General Aptitude</option>
              <option value="Other">Other / Revision</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Theme Color
            </label>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    color === c ? 'scale-110 border-slate-900 dark:border-white shadow' : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor:
                      c === 'indigo' ? '#4f46e5' :
                      c === 'blue' ? '#2563eb' :
                      c === 'cyan' ? '#0891b2' :
                      c === 'teal' ? '#0d9488' :
                      c === 'emerald' ? '#059669' :
                      c === 'green' ? '#16a34a' :
                      c === 'amber' ? '#d97706' :
                      c === 'orange' ? '#ea580c' :
                      c === 'rose' ? '#e11d48' :
                      c === 'purple' ? '#9333ea' : '#7c3aed'
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-sm"
            >
              Create Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
