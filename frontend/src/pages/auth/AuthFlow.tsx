import React, { useState, useCallback, useEffect } from 'react';
import { EmailStep } from './EmailStep';
import { SignupStep } from './SignupStep';
import { OtpStep } from './OtpStep';

type AuthStep = 'email' | 'signup' | 'otp' | 'success';

export const AuthFlow = () => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [isDark, setIsDark] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setIsDark(savedDarkMode === 'true');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  // Update document class when dark mode changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleEmailContinue = useCallback((submittedEmail: string, emailExists: boolean) => {
    setEmail(submittedEmail);
    if (emailExists) {
      setCurrentStep('otp');
    } else {
      setCurrentStep('signup');
    }
  }, []);

  const handleBackToEmail = useCallback(() => {
    setCurrentStep('email');
    setEmail('');
  }, []);

  const handleSignupSuccess = useCallback(() => {
    setCurrentStep('success');
  }, []);

  const handleSignInSuccess = useCallback(() => {
    setCurrentStep('success');
  }, []);

  const handleGoToHome = useCallback(() => {
    // Navigate to home page
    window.location.href = '/';
  }, []);

  // Render success screen
  if (currentStep === 'success') {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${isDark ? 'bg-green-900' : 'bg-green-100'}`}>
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h2 className={`text-3xl font-normal mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Chào mừng đến với GayHub!
          </h2>
          
          <p className={`text-base mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Tài khoản của bạn đã được tạo thành công.
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
          isDark={isDark}
        />
      )}
      
      {currentStep === 'signup' && (
        <SignupStep
          email={email}
          onBack={handleBackToEmail}
          onSignupSuccess={handleSignupSuccess}
          isDark={isDark}
        />
      )}
      
      {currentStep === 'otp' && (
        <OtpStep
          email={email}
          onBack={handleBackToEmail}
          onSignInSuccess={handleSignInSuccess}
          isDark={isDark}
        />
      )}
    </>
  );
};

