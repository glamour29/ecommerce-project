import React, { useState, useCallback } from 'react';

interface EmailStepProps {
  onContinue: (email: string, exists: boolean) => void;
  isDark: boolean;
}

export const EmailStep = ({ onContinue, isDark }: EmailStepProps) => {
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

    // Mock API call - check if email exists
    setTimeout(() => {
      // Simulate: emails ending with "new" are new accounts
      const emailExists = !email.includes('new');
      setLoading(false);
      onContinue(email, emailExists);
    }, 800);
  }, [email, onContinue]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleContinue();
    }
  }, [handleContinue]);

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-12">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            GayHub
          </h1>
        </div>

        {/* Title */}
        <h2 className={`text-3xl font-normal mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
          Nhập email để tham gia hoặc đăng nhập.
        </h2>

        {/* Country */}
        <div className="mb-8">
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Vietnam{' '}
          </span>
          <button className={`text-sm underline ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}>
            Thay đổi
          </button>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label className={`block text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Email*
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="email@example.com"
            className={`w-full px-4 py-3 border rounded-md text-base outline-none transition-colors
              ${isDark 
                ? 'bg-black text-white border-gray-700 focus:border-white placeholder-gray-600' 
                : 'bg-white text-black border-gray-300 focus:border-black placeholder-gray-400'
              }`}
            disabled={loading}
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>

        {/* Privacy Policy */}
        <p className={`text-sm mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Bằng cách tiếp tục, tôi đồng ý với{' '}
          <button className={`underline ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-800'}`}>
            Chính sách Quyền riêng tư
          </button>
          {' '}và{' '}
          <button className={`underline ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-800'}`}>
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
              Đang xử lý...
            </span>
          ) : (
            'Tiếp tục'
          )}
        </button>
      </div>
    </div>
  );
};

