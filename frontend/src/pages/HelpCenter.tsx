import React, { useState } from 'react';
import { Search, MessageCircle, Phone, MapPin, ChevronRight } from 'lucide-react';

export const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const quickAssistsCategories = [
    {
      title: 'Trả Hàng',
      items: [
        'Chính sách trả hàng của GayHub?',
        'Làm thế nào để trả hàng?',
        'Hoàn tiền khi nào?',
      ]
    },
    {
      title: 'Mua Sắm',
      items: [
        'Tìm size phù hợp?',
        'Ưu đãi tốt nhất?',
        'Tư vấn sản phẩm?',
      ]
    },
    {
      title: 'Giao Hàng & Vận Chuyển',
      items: [
        'Tùy chọn giao hàng?',
        'Miễn phí vận chuyển?',
        'Giao hàng quốc tế?',
      ]
    },
    {
      title: 'Thành Viên & Ứng Dụng',
      items: [
        'Thành viên GayHub là gì?',
        'Tham gia chương trình?',
        'Ứng dụng di động?',
      ]
    },
    {
      title: 'Đơn Hàng & Thanh Toán',
      items: [
        'Đơn hàng của tôi ở đâu?',
        'Hủy hoặc thay đổi đơn?',
        'Phương thức thanh toán?',
      ]
    },
    {
      title: 'Thông Tin Công Ty',
      items: [
        'Bảo hành sản phẩm?',
        'Sứ mệnh GayHub?',
        'Về GayHub, Inc.?',
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Tip */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-center text-sm text-gray-700">
            Miễn Phí Vận Chuyển Đơn Từ 3,6 Triệu
          </p>
        </div>
      </div>

      {/* Get Help Section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
            NHẬN TRỢ GIÚP
          </h1>

          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Chúng tôi có thể giúp gì cho bạn?"
              className="w-full px-6 py-4 pr-12 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-gray-900 transition-colors"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">
            Liên Hệ Với Chúng Tôi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Chat */}
            <div className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                <MessageCircle className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Chat với chúng tôi
              </h3>
              <p className="text-sm text-gray-600 mb-1">7:00 - 22:59</p>
              <p className="text-sm text-gray-600">7 ngày/tuần</p>
            </div>

            {/* Call */}
            <div className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                <Phone className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Gọi cho chúng tôi
              </h3>
              <p className="text-sm text-gray-900 font-medium mb-1">12280903 (Viettel)</p>
              <p className="text-sm text-gray-900 font-medium mb-2">12032487 (VTI)</p>
              <p className="text-sm text-gray-600 mb-1">7:00 - 22:59</p>
              <p className="text-sm text-gray-600">7 ngày/tuần</p>
            </div>

            {/* Store */}
            <div className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                <MapPin className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tìm Cửa Hàng
              </h3>
              <button className="text-sm text-gray-900 hover:text-gray-600 transition-colors mt-4 underline">
                Tìm cửa hàng gần bạn
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Assists */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Hỗ Trợ Nhanh
            </h2>
            <p className="text-gray-600">
              Câu trả lời cho các câu hỏi thường gặp chỉ với một cú nhấp chuột.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickAssistsCategories.map((category, index) => (
              <div key={index} className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <button className="text-sm text-gray-700 hover:text-gray-900 transition-colors text-left w-full">
                        {item}
                      </button>
                    </li>
                  ))}
                  <li className="pt-2">
                    <button className="text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors flex items-center gap-1">
                      Xem tất cả
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Mini */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide">
                Nguồn Lực
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Tìm Cửa Hàng</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Trở Thành Thành Viên</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Tìm Giày Chạy Bộ</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Phản Hồi</a></li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide">
                Trợ Giúp
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Nhận Trợ Giúp</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Trạng Thái Đơn Hàng</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Giao Hàng</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Trả Hàng</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Phương Thức Thanh Toán</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Liên Hệ</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide">
                Công Ty
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Về GayHub</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Tin Tức</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Sự Nghiệp</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Nhà Đầu Tư</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Phát Triển Bền Vững</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Báo Cáo</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">
              © 2025 GayHub, Inc. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

