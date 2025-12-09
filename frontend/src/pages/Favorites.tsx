import React from 'react';
import { Heart } from 'lucide-react';
import { useFavoriteStore } from '../store/favoriteStore';
import { FavoriteItem } from '../components/favorites/FavoriteItem';

interface FavoritesProps {
  onNavigateHome?: () => void;
}

export const Favorites: React.FC<FavoritesProps> = ({ onNavigateHome }) => {
  const { items, getItemCount } = useFavoriteStore();
  const itemCount = getItemCount();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Mock recommended products
  const recommendedProducts = [
    {
      id: 'fav-rec-1',
      name: 'Giày Court Legacy',
      price: 480000,
      image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600',
    },
    {
      id: 'fav-rec-2',
      name: 'Giày Dunk Low',
      price: 720000,
      originalPrice: 890000,
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600',
    },
    {
      id: 'fav-rec-3',
      name: 'Giày Blazer Mid',
      price: 650000,
      image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600',
    },
    {
      id: 'fav-rec-4',
      name: 'Giày Air Max SC',
      price: 580000,
      originalPrice: 750000,
      image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600',
    },
  ];

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Yêu Thích</h1>

          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Heart size={48} className="text-gray-400" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Chưa Có Sản Phẩm Yêu Thích
            </h2>

            <p className="text-gray-600 mb-8 text-center max-w-md">
              Bạn chưa có sản phẩm nào trong danh sách yêu thích. Hãy bắt đầu mua sắm để tìm những món đồ bạn muốn!
            </p>

            <button
              onClick={onNavigateHome}
              className="px-8 py-3 bg-black text-white rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
            >
              Bắt Đầu Mua Sắm
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Yêu Thích</h1>
          <p className="text-gray-600">
            {itemCount} {itemCount === 1 ? 'sản phẩm' : 'sản phẩm'}
          </p>
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <FavoriteItem key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Recommended Products */}
      <div className="border-t border-gray-200 bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Bạn Cũng Có Thể Thích
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-semibold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
