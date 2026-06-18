import React from 'react';
import { Search, Command } from 'lucide-react';
import { Input } from '../atoms/Input';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...', value, onChange, className }) => {
  return (
    <div className={`relative w-full max-w-md ${className || ''}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        icon={<Search className="w-4 h-4 text-text-muted" />}
        className="pr-16 rounded-full bg-surface/50 border-white/5 shadow-inner"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-text-muted bg-white/5 border border-white/10 rounded">
          <Command className="w-3 h-3" /> K
        </kbd>
      </div>
    </div>
  );
};
