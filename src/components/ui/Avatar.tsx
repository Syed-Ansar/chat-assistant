import React from 'react';
import { User, Bot, DivideIcon as LucideIcon } from 'lucide-react';

interface AvatarProps {
  role: 'user' | 'assistant';
}

export function Avatar({ role }: AvatarProps) {
  const Icon: LucideIcon = role === 'user' ? User : Bot;
  const colors = role === 'user' 
    ? { bg: 'bg-blue-100', text: 'text-blue-600' }
    : { bg: 'bg-purple-100', text: 'text-purple-600' };

  return (
    <div className={`w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center`}>
      <Icon className={`w-5 h-5 ${colors.text}`} />
    </div>
  );
}