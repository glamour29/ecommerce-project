import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { CartItem } from '../components/cart/CartItem';

interface CartProps {
  onNavigateHome?: () => void;
}

export const Cart: React.FC<CartProps> = ({ onNavigateHome }) => {
  const { items, getItemCount, getTotal } = useCartStore();
  const itemCount = getItemCount();
  const subtotal = getTotal();
  const deliveryFee = 250000; // Phí vận chuyển
  const total = subtotal + deliveryFee;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Mock recommended products
  const recommendedProducts = [
    {
      id: 'rec-1',
      name: 'Giày Air Jordan 1 Mid',
      price: 780000,
      originalPrice: 950000,
      image: 'https://images.unsplash.com/photo-1552346094-f0742e13b3b8?w=600',
    },
    {
      id: 'rec-2',
      name: 'Giày Running Pro',
      price: 650000,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
    },
    {
      id: 'rec-3',
      name: 'Giày Sneaker Classic',
      price: 420000,
      originalPrice: 580000,
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600',
    },
    {
      id: 'rec-4',
      name: 'Giày Sport Lifestyle',
      price: 550000,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600',
    },
  ];

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ Hàng</h1>

          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart size={48} className="text-gray-400" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Giỏ Hàng Trống
            </h2>

            <p className="text-gray-600 mb-8 text-center max-w-md">
              Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy bắt đầu mua sắm để tìm những món đồ yêu thích!
            </p>

            <button
              onClick={onNavigateHome}
              className="px-8 py-3 bg-black text-white rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
            >
              Mua Sắm Ngay
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ Hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            {/* Free Returns Info */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg flex items-start gap-3">
              <Package className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Miễn phí trả hàng cho Thành viên GayHub.
                </p>
                <button className="text-sm text-gray-700 underline hover:text-gray-900">
                  Tìm hiểu thêm
                </button>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tóm Tắt</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-base">
                  <span className="text-gray-700">Tổng phụ</span>
                  <span className="text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-base items-start">
                  <div>
                    <span className="text-gray-700">Vận chuyển & Xử lý</span>
                    <button className="block text-xs text-gray-500 hover:text-gray-700 mt-1">
                      ⓘ
                    </button>
                  </div>
                  <span className="text-gray-900">{formatPrice(deliveryFee)}</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-base font-semibold">
                    <span className="text-gray-900">Tổng cộng</span>
                    <span className="text-gray-900">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-black text-white py-4 rounded-full text-base font-medium hover:bg-gray-800 transition-colors mb-4">
                Thanh Toán Thành Viên
              </button>

              <button className="w-full border-2 border-gray-200 text-gray-900 py-4 rounded-full text-base font-medium hover:border-gray-900 transition-colors">
                Thanh Toán Khách
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="border-t border-gray-200 bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Có Thể Bạn Cũng Thích
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
