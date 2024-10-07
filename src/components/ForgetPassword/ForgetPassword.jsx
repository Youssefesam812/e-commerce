import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const navigate =useNavigate()

  
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email });
      toast.success('Reset code sent to your email');
      setStep(2);
    } catch (error) {
      toast.error('Error sending reset code. Please check your email.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleVerifyResetCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode });
      toast.success('Reset code verified');
      setStep(3);
    } catch (error) {
      toast.error('Invalid reset code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', { email, newPassword });
      toast.success('Password reset successfully');
      navigate('/login')
    } catch (error) {
      toast.error('Error resetting password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 flex items-center justify-center w-[100%] md:min-h-[74%] min-h-[73.3%]" >
      {step === 1 && (
        <form onSubmit={handleForgotPassword}>
          <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
          <div className="mb-4 mt-10">
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              className="w-full px-20 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#2b5f82] text-white rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Code'}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyResetCode}>
          <h2 className="text-2xl font-semibold mb-4">Verify Reset Code</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Reset Code</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#2b5f82] text-white rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#2b5f82] text-white rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}
    </div>
  );
}
