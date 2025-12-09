import React, { useState, useCallback, useEffect } from 'react';

interface OtpStepProps {
  email: string;
  onBack: () => void;
  onSignInSuccess: () => void;
  onGoHome?: () => void;
}

export const OtpStep = ({ email, onBack, onSignInSuccess, onGoHome }: OtpStepProps) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendCode = useCallback(() => {
    if (!canResend) return;
    
    setCountdown(30);
    setCanResend(false);
    setError('');
    
    // Mock resend
    setTimeout(() => {
      alert('Mã xác thực mới đã được gửi đến email của bạn!');
    }, 500);
  }, [canResend]);

  const handleSignIn = useCallback(async () => {
    setError('');
    
    if (code.length !== 6) {
      setError('Vui lòng nhập đủ 6 số');
      return;
    }

    setLoading(true);

    try {
      // Mock API call - TODO: Thay bằng /auth/signin-otp
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock: code "123456" là đúng
      if (code === '123456') {
        onSignInSuccess();
      } else {
        setError('Mã xác thực không đúng. Vui lòng thử lại.');
      }
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }, [code, onSignInSuccess]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && code.length === 6) {
      handleSignIn();
    }
  }, [code, handleSignIn]);

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
        <h2 className="text-3xl font-normal mb-4 text-black">
          Nhập mã 6 số đã gửi đến email của bạn.
        </h2>

        {/* Email Display */}
        <p className="text-sm mb-8 text-gray-600">
          <button onClick={onBack} className="underline hover:text-gray-500">
            {email}
          </button>
        </p>

        {/* Code Input */}
        <div className="mb-4">
          <label className="block text-sm mb-2 text-gray-600">
            Mã 6 số*
          </label>
          <div className="relative">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              onKeyPress={handleKeyPress}
              placeholder="000000"
              maxLength={6}
              className={`w-full px-4 py-3 border rounded-md text-base outline-none transition-colors tracking-widest text-center text-2xl bg-white text-black border-gray-300 focus:border-black placeholder-gray-400
                ${error ? 'border-red-500' : ''}`}
              disabled={loading}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>

        {/* Resend Code */}
        <div className="mb-8 text-center">
          {canResend ? (
            <button
              onClick={handleResendCode}
              className="text-sm underline text-gray-600 hover:text-black"
            >
              Gửi lại mã
            </button>
          ) : (
            <p className="text-sm text-gray-500">
              Gửi lại mã sau {countdown}s
            </p>
          )}
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          disabled={loading || code.length !== 6}
          className={`w-full py-4 rounded-full text-white font-medium text-base transition-all mb-4
            ${loading || code.length !== 6
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
              Đang xác thực...
            </span>
          ) : (
            'Đăng Nhập'
          )}
        </button>

        {/* Use Password Link */}
        <button
          className="w-full py-4 rounded-full border border-gray-300 text-black font-medium text-base transition-all hover:bg-gray-100"
        >
          Sử dụng Mật khẩu
        </button>

        {/* Helper text */}
        <p className="text-xs mt-6 text-center text-gray-500">
          💡 Test: nhập mã <code className="bg-gray-200 text-black px-2 py-1 rounded">123456</code>
        </p>
      </div>
    </div>
  );
};
