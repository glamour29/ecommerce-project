import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { CartItem } from '../components/cart/CartItem';

interface CartProps {
  onNavigateHome?: () => void;
  onCheckout?: () => void;
}

export const Cart: React.FC<CartProps> = ({ onNavigateHome, onCheckout }) => {
  const { items, updateQuantity, removeItem, getTotal, getItemCount } = useCartStore();

  const total = getTotal();
  const itemCount = getItemCount();
  const deliveryFee = 0; // Free delivery
  const finalTotal = total + deliveryFee;

  // Empty state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ Hàng</h1>
          
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Giỏ Hàng Trống
            </h2>
            
            <p className="text-gray-600 mb-8 text-center max-w-md">
              Bạn chưa có sản phẩm nào trong giỏ hàng. Khám phá các sản phẩm tuyệt vời của chúng tôi!
            </p>
            
            <button
              onClick={onNavigateHome}
              className="px-8 py-4 bg-black text-white rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
            >
              Mua Sắm Ngay
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Giỏ Hàng</h1>
            <p className="text-gray-600">
              {itemCount} {itemCount === 1 ? 'sản phẩm' : 'sản phẩm'}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Tổng Đơn Hàng
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="font-medium text-gray-900">
                      {total.toLocaleString('vi-VN')}đ
                    </span>
                  </div>

                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="font-medium text-green-600">
                      Miễn phí
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-gray-900">Tổng cộng</span>
                      <span className="font-bold text-gray-900">
                        {finalTotal.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full py-4 bg-black text-white rounded-full text-base font-semibold hover:bg-gray-800 transition-colors mb-4"
                >
                  Thanh Toán
                </button>

                <button
                  onClick={onNavigateHome}
                  className="w-full py-4 border-2 border-gray-300 text-gray-900 rounded-full text-base font-semibold hover:border-gray-900 transition-colors"
                >
                  Tiếp Tục Mua Sắm
                </button>

                {/* Delivery Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">
                    🚚 Miễn phí vận chuyển cho đơn hàng từ 3.600.000đ
                  </p>
                  <p className="text-sm text-gray-600">
                    📦 Giao hàng trong 3-5 ngày làm việc
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

