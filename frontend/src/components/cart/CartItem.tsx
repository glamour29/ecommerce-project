import React, { memo } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../store/types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem = memo(({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  return (
    <div className="flex gap-6 py-6 border-b border-gray-200 last:border-0 animate-in fade-in duration-300">
      {/* Product Image */}
      <div className="w-32 h-32 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {item.name}
            </h3>
            
            <div className="text-sm text-gray-600 space-y-1">
              {item.size && (
                <p>
                  Size: <span className="text-gray-900">{item.size}</span>
                </p>
              )}
              {item.color && (
                <p>
                  Color: <span className="text-gray-900">{item.color}</span>
                </p>
              )}
            </div>

            {/* Quantity Controls - Mobile visible */}
            <div className="flex items-center gap-4 mt-4 md:hidden">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => onRemove(item.id)}
                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">
              {(item.price * item.quantity).toLocaleString('vi-VN')}đ
            </p>
            {item.quantity > 1 && (
              <p className="text-sm text-gray-500">
                {item.price.toLocaleString('vi-VN')}đ x {item.quantity}
              </p>
            )}
          </div>
        </div>

        {/* Quantity Controls - Desktop visible */}
        <div className="hidden md:flex items-center gap-4 mt-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="p-2 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            <span className="text-sm font-medium">Xóa</span>
          </button>
        </div>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';


