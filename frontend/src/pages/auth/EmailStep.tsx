import React, { useState, useCallback } from 'react';

interface EmailStepProps {
  onContinue: (email: string, exists: boolean) => void;
  onGoHome?: () => void;
}

export const EmailStep = ({ onContinue, onGoHome }: EmailStepProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleContinue = useCallback(async () => {
    setError('');
    
    if (!email.trim()) {
      setError('Vui lòng nhập email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email không hợp lệ');
      return;
    }

    setLoading(true);

    try {
      // Mock API call - Kiểm tra email có tồn tại không
      // TODO: Thay bằng API thật: /auth/check-email?email=...
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock response: email có "existing" = đã tồn tại, ngược lại = mới
      const exists = email.toLowerCase().includes('existing');
      
      // Gọi callback với kết quả
      onContinue(email, exists);
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }, [email, onContinue]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleContinue();
    }
  }, [handleContinue]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-12">
          <button 
            onClick={onGoHome}
            className="text-2xl font-bold text-black hover:text-gray-700 transition-colors"
          >
            GayHub
          </button>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-normal mb-8 text-black">
          Nhập email để tham gia hoặc đăng nhập.
        </h2>

        {/* Country */}
        <div className="mb-8">
          <span className="text-sm text-gray-600">
            Vietnam{' '}
          </span>
          <button className="text-sm underline text-gray-600 hover:text-gray-800">
            Thay đổi
          </button>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm mb-2 text-gray-600">
            Email*
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="email@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-base outline-none transition-colors bg-white text-black placeholder-gray-400 focus:border-black"
            disabled={loading}
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>

        {/* Privacy Policy */}
        <p className="text-sm mb-8 text-gray-600">
          Bằng cách tiếp tục, tôi đồng ý với{' '}
          <button className="underline hover:text-gray-800">
            Chính sách Quyền riêng tư
          </button>
          {' '}và{' '}
          <button className="underline hover:text-gray-800">
            Điều khoản Sử dụng
          </button>
          .
        </p>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={loading || !email.trim()}
          className={`w-full py-4 rounded-full text-white font-medium text-base transition-all
            ${loading || !email.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-black hover:bg-gray-800'
            }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Đang kiểm tra...
            </span>
          ) : (
            'Tiếp tục'
          )}
        </button>

        {/* Helper text */}
        <p className="text-xs mt-6 text-center text-gray-500">
          💡 Test: Email có "existing" → OTP | Email khác → Sign Up
        </p>
      </div>
    </div>
  );
};
