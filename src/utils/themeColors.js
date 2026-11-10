export const colorStyles = {
  indigo: {
    accent: "bg-indigo-600",
    text: "text-indigo-600 dark:text-indigo-400",
    badge: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    bar: "bg-indigo-600 dark:bg-indigo-500",
    ring: "focus:ring-indigo-500",
    border: "border-indigo-200 dark:border-indigo-900/50"
  },
  blue: {
    accent: "bg-blue-600",
    text: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    bar: "bg-blue-600 dark:bg-blue-500",
    ring: "focus:ring-blue-500",
    border: "border-blue-200 dark:border-blue-900/50"
  },
  violet: {
    accent: "bg-violet-600",
    text: "text-violet-600 dark:text-violet-400",
    badge: "bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border-violet-200 dark:border-violet-800",
    bar: "bg-violet-600 dark:bg-violet-500",
    ring: "focus:ring-violet-500",
    border: "border-violet-200 dark:border-violet-900/50"
  },
  purple: {
    accent: "bg-purple-600",
    text: "text-purple-600 dark:text-purple-400",
    badge: "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    bar: "bg-purple-600 dark:bg-purple-500",
    ring: "focus:ring-purple-500",
    border: "border-purple-200 dark:border-purple-900/50"
  },
  amber: {
    accent: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    bar: "bg-amber-500 dark:bg-amber-500",
    ring: "focus:ring-amber-500",
    border: "border-amber-200 dark:border-amber-900/50"
  },
  cyan: {
    accent: "bg-cyan-600",
    text: "text-cyan-600 dark:text-cyan-400",
    badge: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
    bar: "bg-cyan-600 dark:bg-cyan-500",
    ring: "focus:ring-cyan-500",
    border: "border-cyan-200 dark:border-cyan-900/50"
  },
  teal: {
    accent: "bg-teal-600",
    text: "text-teal-600 dark:text-teal-400",
    badge: "bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800",
    bar: "bg-teal-600 dark:bg-teal-500",
    ring: "focus:ring-teal-500",
    border: "border-teal-200 dark:border-teal-900/50"
  },
  sky: {
    accent: "bg-sky-600",
    text: "text-sky-600 dark:text-sky-400",
    badge: "bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    bar: "bg-sky-600 dark:bg-sky-500",
    ring: "focus:ring-sky-500",
    border: "border-sky-200 dark:border-sky-900/50"
  },
  emerald: {
    accent: "bg-emerald-600",
    text: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    bar: "bg-emerald-600 dark:bg-emerald-500",
    ring: "focus:ring-emerald-500",
    border: "border-emerald-200 dark:border-emerald-900/50"
  },
  green: {
    accent: "bg-green-600",
    text: "text-green-600 dark:text-green-400",
    badge: "bg-green-50 text-green-700 dark:bg-green-950/60 dark:text-green-300 border-green-200 dark:border-green-800",
    bar: "bg-green-600 dark:bg-green-500",
    ring: "focus:ring-green-500",
    border: "border-green-200 dark:border-green-900/50"
  },
  rose: {
    accent: "bg-rose-600",
    text: "text-rose-600 dark:text-rose-400",
    badge: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    bar: "bg-rose-600 dark:bg-rose-500",
    ring: "focus:ring-rose-500",
    border: "border-rose-200 dark:border-rose-900/50"
  },
  pink: {
    accent: "bg-pink-600",
    text: "text-pink-600 dark:text-pink-400",
    badge: "bg-pink-50 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 border-pink-200 dark:border-pink-800",
    bar: "bg-pink-600 dark:bg-pink-500",
    ring: "focus:ring-pink-500",
    border: "border-pink-200 dark:border-pink-900/50"
  },
  orange: {
    accent: "bg-orange-600",
    text: "text-orange-600 dark:text-orange-400",
    badge: "bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200 dark:border-orange-800",
    bar: "bg-orange-600 dark:bg-orange-500",
    ring: "focus:ring-orange-500",
    border: "border-orange-200 dark:border-orange-900/50"
  },
  yellow: {
    accent: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    bar: "bg-amber-500 dark:bg-amber-500",
    ring: "focus:ring-amber-500",
    border: "border-amber-200 dark:border-amber-900/50"
  }
};

export function getTheme(colorName) {
  return colorStyles[colorName] || colorStyles.indigo;
}
