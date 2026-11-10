import React from 'react';
import {
  Search,
  X,
  SlidersHorizontal,
  PlusCircle,
  ChevronsUpDown,
  Filter
} from 'lucide-react';

export default function FilterControls({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  allExpanded,
  onToggleExpandAll,
  onOpenAddSubject
}) {
  const categories = [
    "All",
    "Engineering Mathematics",
    "Core Computer Science",
    "General Aptitude"
  ];

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Top row: Search, Sort & Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects or chapters..."
            className="w-full pl-10 pr-9 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 shadow-sm transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 self-end sm:self-auto">
          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 pr-8 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="default">Default Order</option>
              <option value="name">Name (A-Z)</option>
              <option value="progress-asc">Lowest Progress First</option>
              <option value="progress-desc">Highest Progress First</option>
              <option value="chapters-count">Most Chapters</option>
            </select>
            <ChevronsUpDown className="w-3.5 h-3.5 absolute right-2.5 pointer-events-none text-slate-400" />
          </div>

          {/* Expand / Collapse All */}
          <button
            onClick={onToggleExpandAll}
            className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm transition"
          >
            {allExpanded ? 'Collapse All' : 'Expand All'}
          </button>

          {/* Add Custom Subject */}
          <button
            onClick={onOpenAddSubject}
            className="flex items-center space-x-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-medium shadow-sm transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Add Subject</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
              }`}
            >
              {cat === 'Engineering Mathematics' ? 'Engg. Mathematics' : cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
