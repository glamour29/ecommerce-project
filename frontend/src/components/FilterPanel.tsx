import React, { useState, memo, useCallback } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableCategories: string[];
  isMobile?: boolean;
  onClose?: () => void;
}

export const FilterPanel = memo(function FilterPanel({ 
  filters, 
  onFiltersChange, 
  availableCategories,
  isMobile = false,
  onClose
}: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true
  });

  const toggleSection = useCallback((section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  const toggleCategory = useCallback((category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFiltersChange({ ...filters, categories: newCategories });
  }, [filters, onFiltersChange]);

  const handlePriceChange = useCallback((index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...filters.priceRange];
    newRange[index] = value;
    onFiltersChange({ ...filters, priceRange: newRange });
  }, [filters, onFiltersChange]);

  const handleRatingChange = useCallback((rating: number) => {
    onFiltersChange({ ...filters, minRating: rating });
  }, [filters, onFiltersChange]);

  const resetFilters = useCallback(() => {
    onFiltersChange({
      categories: [],
      priceRange: [0, 1000000],
      minRating: 0
    });
  }, [onFiltersChange]);

  // Only count non-default filters as active
  const activeFiltersCount = 
    filters.categories.length + 
    (filters.minRating > 0 ? 1 : 0);

  return (
    <div className={`bg-white dark:bg-gray-900 ${isMobile ? 'h-full overflow-y-auto p-6' : 'rounded-xl border border-gray-200 dark:border-gray-700 p-6'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bộ Lọc</h2>
          {activeFiltersCount > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {activeFiltersCount} bộ lọc đang áp dụng
            </p>
          )}
        </div>
        {isMobile && onClose && (
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-900 dark:text-white">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Reset Button */}
      {activeFiltersCount > 0 && (
        <button
          onClick={resetFilters}
          className="w-full mb-6 py-2 px-4 text-sm font-medium text-orange-600 dark:text-orange-400 border border-orange-600 dark:border-orange-400 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-colors"
        >
          Xóa Tất Cả Bộ Lọc
        </button>
      )}

      {/* Categories Section */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-6">
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-gray-900 dark:text-white font-semibold">Danh Mục</span>
          {expandedSections.categories ? (
            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
        
        {expandedSections.categories && (
          <div className="space-y-2 animate-in fade-in duration-200">
            {availableCategories.map(category => (
              <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="w-4 h-4 text-orange-600 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-orange-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Section */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-gray-900 dark:text-white font-semibold">Khoảng Giá</span>
          {expandedSections.price ? (
            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="space-y-3 animate-in fade-in duration-200">
            {/* Preset Price Ranges */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onFiltersChange({ ...filters, priceRange: [0, 1000000] })}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  filters.priceRange[0] === 0 && filters.priceRange[1] === 1000000
                    ? 'bg-orange-600 text-white border-orange-600'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-600 dark:hover:border-orange-600'
                }`}
              >
                Tất Cả
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, priceRange: [0, 100000] })}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  filters.priceRange[0] === 0 && filters.priceRange[1] === 100000
                    ? 'bg-orange-600 text-white border-orange-600'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-600 dark:hover:border-orange-600'
                }`}
              >
                Dưới 100k
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, priceRange: [100000, 300000] })}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  filters.priceRange[0] === 100000 && filters.priceRange[1] === 300000
                    ? 'bg-orange-600 text-white border-orange-600'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-600 dark:hover:border-orange-600'
                }`}
              >
                100k - 300k
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, priceRange: [300000, 500000] })}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  filters.priceRange[0] === 300000 && filters.priceRange[1] === 500000
                    ? 'bg-orange-600 text-white border-orange-600'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-600 dark:hover:border-orange-600'
                }`}
              >
                300k - 500k
              </button>
              <button
                onClick={() => onFiltersChange({ ...filters, priceRange: [500000, 1000000] })}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  filters.priceRange[0] === 500000 && filters.priceRange[1] === 1000000
                    ? 'bg-orange-600 text-white border-orange-600'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-orange-600 dark:hover:border-orange-600'
                }`}
              >
                500k - 1M
              </button>
            </div>

            {/* Current Selection Display */}
            <div className="text-center py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                {filters.priceRange[0].toLocaleString('vi-VN')}đ - {filters.priceRange[1].toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Rating Section */}
      <div className="mb-2">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-gray-900 dark:text-white font-semibold">Đánh Giá Tối Thiểu</span>
          {expandedSections.rating ? (
            <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
        
        {expandedSections.rating && (
          <div className="space-y-2 animate-in fade-in duration-200">
            {[4.5, 4.0, 3.5, 3.0, 0].map(rating => (
              <label key={rating} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="w-4 h-4 text-orange-600 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {rating > 0 ? `${rating}+ sao` : 'Tất cả đánh giá'}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
