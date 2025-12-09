import React, { memo } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { FavoriteItem as FavoriteItemType } from '../../store/types';

interface FavoriteItemProps {
  item: FavoriteItemType;
  onAddToCart: (item: FavoriteItemType) => void;
  onRemove: (id: string) => void;
}

export const FavoriteItem = memo(({ item, onAddToCart, onRemove }: FavoriteItemProps) => {
  return (
    <div className="group animate-in fade-in duration-300">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Remove from Favorites */}
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
          aria-label="Remove from favorites"
        >
          <Heart className="w-5 h-5 text-red-500 fill-current" />
        </button>

        {/* On Sale Badge */}
        {item.originalPrice && item.originalPrice > item.price && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-medium text-gray-900 line-clamp-2 flex-1">
            {item.name}
          </h3>
        </div>

        <p className="text-sm text-gray-600">{item.category}</p>

        {/* Rating */}
        {item.rating && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-700 font-medium">{item.rating}</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            {item.price.toLocaleString('vi-VN')}đ
          </span>
          {item.originalPrice && item.originalPrice > item.price && (
            <span className="text-sm text-gray-500 line-through">
              {item.originalPrice.toLocaleString('vi-VN')}đ
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(item)}
          className="w-full mt-3 py-3 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Thêm Vào Giỏ
        </button>
      </div>
    </div>
  );
});

FavoriteItem.displayName = 'FavoriteItem';

