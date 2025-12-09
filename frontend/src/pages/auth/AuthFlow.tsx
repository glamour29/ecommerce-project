import React, { useState, useCallback } from 'react';
import { EmailStep } from './EmailStep';
import { SignupStep } from './SignupStep';
import { OtpStep } from './OtpStep';
import { useUser } from '../../contexts/UserContext';

type AuthStep = 'email' | 'signup' | 'otp' | 'success';

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
}

export const AuthFlow = () => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [signupData, setSignupData] = useState<SignupData | null>(null);
  const { login } = useUser();

  // Handler khi user nhập email và nhấn Continue
  // Chỉ sau khi check email xong mới chuyển step
  const handleEmailContinue = useCallback((submittedEmail: string, emailExists: boolean) => {
    setEmail(submittedEmail);
    
    if (emailExists) {
      // Email ĐÃ TỒN TẠI → Chuyển sang OTP Sign In
      setCurrentStep('otp');
    } else {
      // Email CHƯA TỒN TẠI → Chuyển sang Sign Up
      setCurrentStep('signup');
    }
  }, []);

  const handleBackToEmail = useCallback(() => {
    setCurrentStep('email');
    setEmail('');
  }, []);

  const handleGoHome = useCallback(() => {
    window.location.href = '/';
  }, []);

  const handleSignupSuccess = useCallback((firstName: string, lastName: string) => {
    // Save user data and login
    const userData = {
      id: `user-${Date.now()}`, // Mock ID
      email,
      firstName,
      lastName,
    };
    login(userData);
    setSignupData({ firstName, lastName, email });
    setCurrentStep('success');
  }, [email, login]);

  const handleSignInSuccess = useCallback(() => {
    // Mock user data for OTP login (in real app, get from API)
    const userData = {
      id: `user-${Date.now()}`,
      email,
      firstName: email.split('@')[0], // Use email prefix as name
      lastName: 'User',
    };
    login(userData);
    setCurrentStep('success');
  }, [email, login]);

  const handleGoToHome = useCallback(() => {
    // Navigate to home page
    window.location.href = '/';
  }, []);

  // Render success screen
  if (currentStep === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center bg-green-100">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-3xl font-normal mb-4 text-black">
            Chào mừng {signupData?.firstName || 'bạn'} đến với GayHub!
          </h2>
          
          <p className="text-base mb-8 text-gray-600">
            Tài khoản của bạn đã được {signupData ? 'tạo' : 'đăng nhập'} thành công.
            <br />
            Bắt đầu khám phá ngay!
          </p>
          
          <button
            onClick={handleGoToHome}
            className="w-full py-4 rounded-full bg-black text-white font-medium text-base hover:bg-gray-800 transition-all"
          >
            Về Trang Chủ
          </button>
        </div>
      </div>
    );
  }

  // Render current step
  return (
    <>
      {currentStep === 'email' && (
        <EmailStep
          onContinue={handleEmailContinue}
          onGoHome={handleGoHome}
        />
      )}
      
      {currentStep === 'signup' && (
        <SignupStep
          email={email}
          onBack={handleBackToEmail}
          onSignupSuccess={handleSignupSuccess}
          onGoHome={handleGoHome}
        />
      )}
      
      {currentStep === 'otp' && (
        <OtpStep
          email={email}
          onBack={handleBackToEmail}
          onSignInSuccess={handleSignInSuccess}
          onGoHome={handleGoHome}
        />
      )}
    </>
  );
};
