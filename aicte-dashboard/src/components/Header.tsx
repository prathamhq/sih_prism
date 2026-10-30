// Header Component with Search and Notifications
import React, { useState } from 'react';
import { Search, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { debounce } from '../utils/helpers';

export const Header: React.FC = () => {
  const { currentRole, filters, setFilters } = useApp();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = debounce((value: string) => {
    setFilters({ ...filters, search: value });
  }, 300);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearch(value);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search case ID, college or AICTE ID..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {currentRole === 'officer' && (
          <span className="text-xs bg-brand-soft text-brand-teal font-medium px-3 py-1.5 rounded-lg">
            Madhya Pradesh
          </span>
        )}
        <div className="relative">
          <button className="p-2 text-gray-500 hover:text-gray-700 relative transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
