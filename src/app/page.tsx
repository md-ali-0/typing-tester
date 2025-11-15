'use client';

import TypingTestComponent from '@/components/typing-test';
import { getCurrentUser } from '@/lib/auth-utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Master Your Typing Skills
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10">
              Improve your typing speed and accuracy with our scientifically designed tests and personalized training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/test" 
                className="px-8 py-4 rounded-xl text-lg font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Start Typing Test
              </Link>
              {currentUser ? (
                <Link 
                  href="/stats" 
                  className="px-8 py-4 rounded-xl text-lg font-bold glass hover:bg-muted/50 transition-all"
                >
                  View Statistics
                </Link>
              ) : (
                <Link 
                  href="/signup" 
                  className="px-8 py-4 rounded-xl text-lg font-bold glass hover:bg-muted/50 transition-all"
                >
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose TypeMaster?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed to help you achieve professional typing speeds
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-2xl hover:shadow-xl transition-all animated-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Feedback</h3>
              <p className="text-muted-foreground">
                Get instant feedback on your typing accuracy and speed as you type, helping you identify areas for improvement.
              </p>
            </div>
            
            <div className="glass p-8 rounded-2xl hover:shadow-xl transition-all animated-border">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Detailed Analytics</h3>
              <p className="text-muted-foreground">
                Track your progress over time with comprehensive statistics and insights into your typing performance.
              </p>
            </div>
            
            <div className="glass p-8 rounded-2xl hover:shadow-xl transition-all animated-border">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Training</h3>
              <p className="text-muted-foreground">
                Customized lessons and exercises tailored to your skill level and improvement goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Test Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Try It Now</h2>
            <p className="text-xl text-muted-foreground">
              Take a quick typing test to see how fast you can type
            </p>
          </div>
          
          <div className="glass border border-border rounded-2xl p-6 shadow-xl">
            <TypingTestComponent />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Improve Your Typing?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of users who have improved their typing skills with TypeMaster
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/test" 
              className="px-8 py-4 rounded-xl text-lg font-bold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Get Started
            </Link>
            <Link 
              href="/blog" 
              className="px-8 py-4 rounded-xl text-lg font-bold glass hover:bg-muted/50 transition-all"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}