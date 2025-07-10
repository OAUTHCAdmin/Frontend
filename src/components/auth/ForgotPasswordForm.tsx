'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon } from '@/icons';
import Input from '../form/input/InputField';
import Button from '../ui/button/Button';
import Label from '../form/Label';
// import Image from 'next/image';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
    //   setLoading(true);
    });
    setError('');

    try {
      // Replace with your actual forgot password API endpoint
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || 'Failed to send reset link');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
    //   setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex">
        {/* Left side - Success Message */}
        <div className="flex-1 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Check Your Email
            </h2>
            <p className="text-gray-600">
              We&#39;ve sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500">
              Didn&#39;t receive the email? Check your spam folder or try again.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => {
                  setSuccess(false);
                  setEmail("");
                }}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/signin"
                className="block w-full text-center text-green-600 hover:text-green-500 py-3 px-4 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
        </div>
        );
  }

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full h-full min-h-screen">
      {/* Back to dashboard link - positioned absolutely */}
      <div className="absolute top-8 left-8 z-10">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>

      {/* Centered Form Container */}
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md mx-auto">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Your Password?</h2>
            <p className="text-gray-600">
              Enter the email address linked to your account, and we&#39;ll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email<span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <Button
            //   type="submit"
              disabled={isPending}
              className="w-full"
            >
              {isPending ? 'Sending Reset Link...' : 'Send Reset Link'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Wait, I remember my password...{' '}
            <Link href="/signin" className="text-green-600 hover:text-green-500 font-medium">
              Click here
            </Link>
          </p>
        </div>
      </div>
      </div>
  );
}