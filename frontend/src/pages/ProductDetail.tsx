import React, { useState } from 'react';
import { Heart, Star, Package, Truck, RotateCcw } from 'lucide-react';
import { SizeSelector } from '../components/product/SizeSelector';
import { AccordionSection } from '../components/product/AccordionSection';
import { useCartStore } from '../store/cartStore';
import { useFavoriteStore } from '../store/favoriteStore';

// Mock product data - sẽ replace bằng props hoặc API
const MOCK_PRODUCT = {
  id: 'prod-1',
  name: 'Giày Thể Thao Air Max Classic',
  price: 650000,
  originalPrice: 890000,
  rating: 4.8,
  reviewCount: 190,
  category: 'Giày',
  description: 'Giày thể thao cao cấp với đệm êm ái, thiết kế hiện đại, phù hợp cho mọi hoạt động hàng ngày.',
  images: [
    'https://images.unsplash.com/photo-1608380272894-b3617f04b463?w=1080',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1080',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1080',
    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=1080',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1080',
  ],
  colors: [
    { name: 'Black/White', image: 'https://images.unsplash.com/photo-1608380272894-b3617f04b463?w=200' },
    { name: 'White/Red', image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=200' },
    { name: 'Grey', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200' },
    { name: 'Blue/White', image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=200' },
  ],
  sizes: ['38.5', '39', '40', '40.5', '41', '42', '42.5', '43', '44', '44.5', '45', '45.5'],
  styleCode: 'DH2987-001',
  origin: 'Indonesia, Vietnam',
};

interface ProductDetailProps {
  productId?: string | null;
  products?: Array<{
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    category: string;
    image: string;
    description: string;
  }>;
  onNavigateHome?: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ productId, products = [], onNavigateHome }) => {
  // Find product from list or use mock data
  const productFromList = products.find(p => p.id === productId);
  const product = productFromList || MOCK_PRODUCT;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity] = useState(1);

  const { addItem: addToCart } = useCartStore();
  const { toggleItem: toggleFavorite, isFavorite } = useFavoriteStore();

  const isInFavorites = isFavorite(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToBag = () => {
    if (!selectedSize && product.category === 'Giày') {
      alert('Vui lòng chọn size!');
      return;
    }

    addToCart({
      id: `${product.id}-${selectedSize || 'default'}`,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      size: selectedSize || undefined,
    });

    alert('Đã thêm vào giỏ hàng!');
  };

  const handleToggleFavorite = () => {
    toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      rating: product.rating,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Product Image - Sticky */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Product Info - Scrollable */}
          <div>
            {/* Title & Price */}
            <div className="mb-6">
              {discount > 0 && (
                <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  Giảm {discount}%
                </span>
              )}
              
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>
              
              <p className="text-base text-gray-600 mb-4">
                {product.category}
              </p>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-2xl font-bold text-gray-900">
                  {product.price.toLocaleString('vi-VN')}đ
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {product.originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold text-gray-900">
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({MOCK_PRODUCT.reviewCount} đánh giá)
                </span>
              </div>
            </div>

            {/* Size Selector */}
            <SizeSelector
              sizes={MOCK_PRODUCT.sizes}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              type="shoe"
            />

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <button
                onClick={handleAddToBag}
                className="w-full py-5 bg-black text-white rounded-full text-base font-semibold hover:bg-gray-800 transition-colors"
              >
                Thêm Vào Giỏ
              </button>

              <button
                onClick={handleToggleFavorite}
                className={`w-full py-5 border-2 rounded-full text-base font-semibold transition-all flex items-center justify-center gap-2 ${
                  isInFavorites
                    ? 'border-red-500 text-red-500 bg-red-50'
                    : 'border-gray-300 text-gray-900 hover:border-gray-900'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInFavorites ? 'fill-current' : ''}`} />
                {isInFavorites ? 'Đã Yêu Thích' : 'Yêu Thích'}
              </button>
            </div>

            {/* Delivery Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Truck className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Miễn Phí Vận Chuyển</p>
                  <p className="text-sm text-gray-600">
                    Giao hàng miễn phí cho đơn từ 3.600.000đ
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <RotateCcw className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Đổi Trả Miễn Phí</p>
                  <p className="text-sm text-gray-600">
                    Đổi trả trong vòng 30 ngày
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Package className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Giao Hàng Nhanh</p>
                  <p className="text-sm text-gray-600">
                    Nhận hàng trong 3-5 ngày làm việc
                  </p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200">
              <AccordionSection title="Xem Thông Tin Sản Phẩm" defaultOpen>
                <div className="space-y-3">
                  <p>{product.description}</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Danh mục: {product.category}</li>
                    <li>Mã sản phẩm: {MOCK_PRODUCT.styleCode}</li>
                    <li>Xuất xứ: {MOCK_PRODUCT.origin}</li>
                  </ul>
                </div>
              </AccordionSection>

              <AccordionSection title="Size & Fit">
                <div className="space-y-2">
                  <p>Fits large; we recommend ordering half a size down</p>
                  <p>Phù hợp cho mọi hoạt động hàng ngày</p>
                  <p>Đế giày có độ dày thoải mái</p>
                </div>
              </AccordionSection>

              <AccordionSection title="Miễn Phí Vận Chuyển & Đổi Trả">
                <div className="space-y-2">
                  <p>✓ Miễn phí vận chuyển cho đơn hàng từ 3.600.000đ</p>
                  <p>✓ Đổi trả miễn phí trong vòng 30 ngày</p>
                  <p>✓ Thanh toán khi nhận hàng (COD)</p>
                  <p>✓ Bảo hành 6 tháng</p>
                </div>
              </AccordionSection>

              <AccordionSection title="Sản Xuất Như Thế Nào">
                <div className="space-y-2">
                  <p>Sản phẩm được làm từ ít nhất 20% vật liệu tái chế.</p>
                  <p>Cam kết bảo vệ môi trường và phát triển bền vững.</p>
                  <p>Chất liệu cao cấp, bền bỉ theo thời gian.</p>
                </div>
              </AccordionSection>

              <AccordionSection title={`Đánh Giá (${MOCK_PRODUCT.reviewCount})`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-bold">{product.rating}</span>
                    <span className="text-gray-500">/ 5.0</span>
                  </div>
                  <p className="text-gray-600">
                    {MOCK_PRODUCT.reviewCount} người đã đánh giá sản phẩm này
                  </p>
                </div>
              </AccordionSection>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-16"></div>

      {/* Recommended Products Section - Separate scroll area */}
      <RecommendedProducts currentProductId={product.id} />
    </div>
  );
};

// Recommended Products Component
const RecommendedProducts = ({ currentProductId }: { currentProductId: string }) => {
  // Mock recommended products
  const recommendedProducts = [
    {
      id: 'prod-2',
      name: 'Giày Cao Cổ Jordan Basketball',
      price: 890000,
      image: 'https://images.unsplash.com/photo-1552346094-f0742e13b3b8?w=600',
    },
    {
      id: 'prod-3',
      name: 'Giày Chạy Bộ UltraBoost Pro',
      price: 750000,
      image: 'https://images.unsplash.com/photo-1719759674376-a001dc166cb6?w=600',
    },
    {
      id: 'prod-4',
      name: 'Giày Sneaker Trắng Tối Giản',
      price: 450000,
      originalPrice: 650000,
      image: 'https://images.unsplash.com/photo-1573875133340-0b589f59a8c4?w=600',
    },
    {
      id: 'prod-5',
      name: 'Dép Slides Thể Thao',
      price: 250000,
      image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600',
    },
  ].filter((p) => p.id !== currentProductId);

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Có Thể Bạn Cũng Thích
          </h2>
          <p className="text-gray-600">
            Khám phá thêm các sản phẩm tương tự
          </p>
        </div>

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
                  {product.price.toLocaleString('vi-VN')}đ
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


