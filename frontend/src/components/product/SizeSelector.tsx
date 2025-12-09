import React, { memo } from 'react';
import { Ruler } from 'lucide-react';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  onSelectSize: (size: string) => void;
  type?: 'shoe' | 'clothing';
}

export const SizeSelector = memo(({ sizes, selectedSize, onSelectSize, type = 'shoe' }: SizeSelectorProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {type === 'shoe' ? 'Chọn Size' : 'Chọn Kích Cỡ'}
        </h3>
        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-black transition-colors">
          <Ruler className="w-4 h-4" />
          <span className="underline">Hướng Dẫn Chọn Size</span>
        </button>
      </div>

      {type === 'shoe' && (
        <p className="text-sm text-gray-600 mb-4">
          Fits large; we recommend ordering half a size down
        </p>
      )}

      <div className="grid grid-cols-3 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelectSize(size)}
            className={`py-4 px-2 border-2 rounded-lg text-center font-medium transition-all ${
              selectedSize === size
                ? 'border-black bg-white text-black'
                : 'border-gray-200 bg-white text-gray-900 hover:border-gray-400'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
});

SizeSelector.displayName = 'SizeSelector';


