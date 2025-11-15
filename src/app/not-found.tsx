'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="text-9xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            404
          </div>
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold hover:shadow-lg transition-all text-center"
            >
              Go Home
            </Link>
            <Link 
              href="/test" 
              className="px-6 py-3 rounded-lg border border-border bg-card text-foreground font-bold hover:bg-muted transition-all text-center"
            >
              Take a Test
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}