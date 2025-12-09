import React, { useState, useCallback } from 'react';
import { EmailStep } from './EmailStep';
import { SignupStep } from './SignupStep';
import { OtpStep } from './OtpStep';

type AuthStep = 'email' | 'signup' | 'otp' | 'success';

export const AuthFlow = () => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');

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
            Chào mừng đến với GayHub!
          </h2>
          
          <p className="text-base mb-8 text-gray-600">
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
        />
      )}
      
      {currentStep === 'signup' && (
        <SignupStep
          email={email}
          onBack={handleBackToEmail}
          onSignupSuccess={handleSignupSuccess}
        />
      )}
      
      {currentStep === 'otp' && (
        <OtpStep
          email={email}
          onBack={handleBackToEmail}
          onSignInSuccess={handleSignInSuccess}
        />
      )}
    </>
  );
};
