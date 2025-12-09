import React, { memo } from 'react';
import { Check } from 'lucide-react';

interface ColorOption {
  name: string;
  image: string;
  hex?: string;
}

interface ColorSelectorProps {
  colors: ColorOption[];
  selectedColor: string | null;
  onSelectColor: (colorName: string) => void;
}

export const ColorSelector = memo(({ colors, selectedColor, onSelectColor }: ColorSelectorProps) => {
  if (colors.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Chọn Màu
      </h3>

      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onSelectColor(color.name)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
              selectedColor === color.name
                ? 'border-black'
                : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <img
              src={color.image}
              alt={color.name}
              className="w-full h-full object-cover"
            />
            {selectedColor === color.name && (
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
});

ColorSelector.displayName = 'ColorSelector';


