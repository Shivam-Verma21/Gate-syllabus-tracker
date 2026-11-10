import React from 'react';
import {
  Binary,
  Grid3X3,
  Variable,
  Percent,
  Compass,
  Cpu,
  HardDrive,
  Code2,
  Boxes,
  GitBranch,
  Layers,
  Wrench,
  Terminal,
  Database,
  Network,
  BookOpen
} from 'lucide-react';

export const iconMap = {
  Binary,
  Grid3X3,
  Variable,
  Percent,
  Compass,
  Cpu,
  HardDrive,
  Code2,
  Boxes,
  GitBranch,
  Layers,
  Wrench,
  Terminal,
  Database,
  Network,
  BookOpen
};

export function getSubjectIcon(name, className = "w-5 h-5") {
  const IconComponent = iconMap[name] || BookOpen;
  return <IconComponent className={className} />;
}
