import React, { useState, useCallback } from 'react';
import { RefreshCw, Eye, EyeOff, ChevronDown } from 'lucide-react';

interface SignupStepProps {
  email: string;
  onBack: () => void;
  onSignupSuccess: (firstName: string, lastName: string) => void;
  onGoHome?: () => void;
}

export const SignupStep = ({ email, onBack, onSignupSuccess, onGoHome }: SignupStepProps) => {
  const [code, setCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [shoppingPref, setShoppingPref] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [codeSent, setCodeSent] = useState(true);

  const validatePassword = (pwd: string) => {
    const hasMinLength = pwd.length >= 8;
    const hasUpperLower = /[a-z]/.test(pwd) && /[A-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    return { hasMinLength, hasUpperLower, hasNumber };
  };

  const passwordValidation = validatePassword(password);
  const isPasswordValid = passwordValidation.hasMinLength && passwordValidation.hasUpperLower && passwordValidation.hasNumber;

  const handleResendCode = useCallback(() => {
    setCodeSent(false);
    setTimeout(() => {
      setCodeSent(true);
      alert('Mã xác thực mới đã được gửi đến email của bạn!');
    }, 1000);
  }, []);

  const handleCreateAccount = useCallback(async () => {
    const newErrors: Record<string, string> = {};

    if (!code || code.length < 6) newErrors.code = 'Vui lòng nhập mã xác thực';
    if (!firstName.trim()) newErrors.firstName = 'Vui lòng nhập tên';
    if (!lastName.trim()) newErrors.lastName = 'Vui lòng nhập họ';
    if (!password) newErrors.password = 'Vui lòng nhập mật khẩu';
    if (!isPasswordValid) newErrors.password = 'Mật khẩu không đáp ứng yêu cầu';
    if (!shoppingPref) newErrors.shoppingPref = 'Vui lòng chọn sở thích mua sắm';
    if (!agreeTerms) newErrors.terms = 'Bạn phải đồng ý với điều khoản';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      // Mock API call - TODO: Thay bằng /auth/signup
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSignupSuccess(firstName, lastName);
    } catch (err) {
      setErrors({ general: 'Có lỗi xảy ra. Vui lòng thử lại.' });
    } finally {
      setLoading(false);
    }
  }, [code, firstName, lastName, password, shoppingPref, agreeTerms, isPasswordValid, onSignupSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8">
          <button 
            onClick={onGoHome}
            className="text-2xl font-bold text-black hover:text-gray-700 transition-colors"
          >
            GayHub
          </button>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-normal mb-4 text-black">
          Hãy trở thành Thành viên GayHub.
        </h2>

        {/* Subtitle */}
        <p className="text-sm mb-6 text-gray-600">
          Chúng tôi đã gửi mã xác thực đến{' '}
          <button onClick={onBack} className="underline hover:text-gray-500">
            {email}
          </button>
        </p>

        {/* Code Input */}
        <div className="mb-4">
          <label className="block text-sm mb-2 text-gray-600">
            Mã xác thực*
          </label>
          <div className="relative">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
              placeholder="Nhập mã 6-8 số"
              maxLength={8}
              className={`w-full px-4 py-3 border rounded-md text-base outline-none transition-colors pr-12 bg-white text-black border-gray-300 focus:border-black placeholder-gray-400
                ${errors.code ? 'border-red-500' : ''}`}
            />
            <button
              onClick={handleResendCode}
              disabled={!codeSent}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                codeSent ? 'text-gray-600 hover:text-black' : 'text-gray-400'
              }`}
            >
              <RefreshCw className={`w-5 h-5 ${!codeSent ? 'animate-spin' : ''}`} />
            </button>
          </div>
          {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-2 text-gray-600">
              Tên*
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Tên"
              className={`w-full px-4 py-3 border rounded-md text-base outline-none transition-colors bg-white text-black border-gray-300 focus:border-black placeholder-gray-400
                ${errors.firstName ? 'border-red-500' : ''}`}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-600">
              Họ*
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Họ"
              className={`w-full px-4 py-3 border rounded-md text-base outline-none transition-colors bg-white text-black border-gray-300 focus:border-black placeholder-gray-400
                ${errors.lastName ? 'border-red-500' : ''}`}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm mb-2 text-gray-600">
            Mật khẩu*
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              className={`w-full px-4 py-3 border rounded-md text-base outline-none transition-colors pr-12 bg-white text-black border-gray-300 focus:border-black placeholder-gray-400
                ${errors.password ? 'border-red-500' : ''}`}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {password && (
            <div className="mt-2 space-y-1">
              <p className={`text-xs flex items-center ${passwordValidation.hasMinLength ? 'text-green-500' : 'text-gray-400'}`}>
                <span className="mr-2">{passwordValidation.hasMinLength ? '✓' : '✗'}</span>
                Tối thiểu 8 ký tự
              </p>
              <p className={`text-xs flex items-center ${passwordValidation.hasUpperLower ? 'text-green-500' : 'text-gray-400'}`}>
                <span className="mr-2">{passwordValidation.hasUpperLower ? '✓' : '✗'}</span>
                Chữ hoa, chữ thường
              </p>
              <p className={`text-xs flex items-center ${passwordValidation.hasNumber ? 'text-green-500' : 'text-gray-400'}`}>
                <span className="mr-2">{passwordValidation.hasNumber ? '✓' : '✗'}</span>
                Ít nhất một số
              </p>
            </div>
          )}
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Shopping Preference */}
        <div className="mb-4">
          <label className="block text-sm mb-2 text-gray-600">
            Sở thích mua sắm*
          </label>
          <div className="relative">
            <select
              value={shoppingPref}
              onChange={(e) => setShoppingPref(e.target.value)}
              className={`w-full px-4 py-3 border rounded-md text-base outline-none transition-colors appearance-none bg-white text-black border-gray-300 focus:border-black
                ${errors.shoppingPref ? 'border-red-500' : ''}`}
            >
              <option value="">Chọn sở thích</option>
              <option value="men">Nam</option>
              <option value="women">Nữ</option>
              <option value="kids">Trẻ em</option>
              <option value="all">Tất cả</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-gray-600" />
          </div>
          {errors.shoppingPref && <p className="text-red-500 text-sm mt-1">{errors.shoppingPref}</p>}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-sm mb-2 text-gray-600">
            Ngày sinh
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              value={dobDay}
              onChange={(e) => setDobDay(e.target.value.replace(/\D/g, '').slice(0, 2))}
              placeholder="Ngày"
              maxLength={2}
              className="px-4 py-3 border rounded-md text-base outline-none transition-colors bg-white text-black border-gray-300 focus:border-black placeholder-gray-400"
            />
            <input
              type="text"
              value={dobMonth}
              onChange={(e) => setDobMonth(e.target.value.replace(/\D/g, '').slice(0, 2))}
              placeholder="Tháng"
              maxLength={2}
              className="px-4 py-3 border rounded-md text-base outline-none transition-colors bg-white text-black border-gray-300 focus:border-black placeholder-gray-400"
            />
            <input
              type="text"
              value={dobYear}
              onChange={(e) => setDobYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="Năm"
              maxLength={4}
              className="px-4 py-3 border rounded-md text-base outline-none transition-colors bg-white text-black border-gray-300 focus:border-black placeholder-gray-400"
            />
          </div>
          <p className="text-xs mt-2 text-gray-500">
            Nhận phần thưởng Thành viên vào ngày sinh nhật của bạn.
          </p>
        </div>

        {/* Checkboxes */}
        <div className="mb-6 space-y-3">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={emailUpdates}
              onChange={(e) => setEmailUpdates(e.target.checked)}
              className="mt-1 w-4 h-4 rounded"
            />
            <span className="ml-3 text-sm text-gray-600">
              Đăng ký email để nhận thông tin cập nhật về sản phẩm, ưu đãi và quyền lợi Thành viên.
            </span>
          </label>
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-1 w-4 h-4 rounded"
            />
            <span className="ml-3 text-sm text-gray-600">
              Tôi đồng ý với{' '}
              <button className="underline hover:text-gray-500">Chính sách Quyền riêng tư</button>
              {' '}và{' '}
              <button className="underline hover:text-gray-500">Điều khoản Sử dụng</button>.
            </span>
          </label>
          {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
        </div>

        {/* Create Account Button */}
        <button
          onClick={handleCreateAccount}
          disabled={loading}
          className={`w-full py-4 rounded-full text-white font-medium text-base transition-all mb-4
            ${loading
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
              Đang tạo tài khoản...
            </span>
          ) : (
            'Tạo Tài Khoản'
          )}
        </button>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full py-4 rounded-full border border-gray-300 text-black font-medium text-base transition-all hover:bg-gray-100"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};
