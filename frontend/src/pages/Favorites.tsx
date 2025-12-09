import React from 'react';
import { Heart } from 'lucide-react';
import { useFavoriteStore } from '../store/favoriteStore';
import { useCartStore } from '../store/cartStore';
import { FavoriteItem } from '../components/favorites/FavoriteItem';
import { FavoriteItem as FavoriteItemType } from '../store/types';

interface FavoritesProps {
  onNavigateHome?: () => void;
}

export const Favorites: React.FC<FavoritesProps> = ({ onNavigateHome }) => {
  const { items, removeItem, getItemCount } = useFavoriteStore();
  const { addItem: addToCart } = useCartStore();

  const itemCount = getItemCount();

  const handleAddToCart = (item: FavoriteItemType) => {
    // Convert FavoriteItem to CartItem
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    
    // Show success message (optional)
    // You can add a toast notification here
  };

  // Empty state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Yêu Thích</h1>
          
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Chưa Có Sản Phẩm Yêu Thích
            </h2>
            
            <p className="text-gray-600 mb-8 text-center max-w-md">
              Bắt đầu thêm các sản phẩm bạn yêu thích để dễ dàng tìm thấy sau này.
            </p>
            
            <button
              onClick={onNavigateHome}
              className="px-8 py-4 bg-black text-white rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
            >
              Khám Phá Ngay
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Yêu Thích</h1>
            <p className="text-gray-600">
              {itemCount} {itemCount === 1 ? 'sản phẩm' : 'sản phẩm'}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <FavoriteItem
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
              onRemove={removeItem}
            />
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <button
            onClick={onNavigateHome}
            className="px-8 py-4 border-2 border-gray-300 text-gray-900 rounded-full text-base font-semibold hover:border-gray-900 transition-colors"
          >
            Tiếp Tục Mua Sắm
          </button>
        </div>
      </div>
    </div>
  );
};

