'use client';

import { DarkModeToggle } from '@/components/dark-mode-toggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AuthHeader() {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Login', href: '/login' },
    { name: 'Sign Up', href: '/signup' },
  ];

  return (
    <>
      {/* Dark Horizon Glow Background */}
      <div className="dark-horizon-glow" />
      
      <header className="sticky top-0 z-50 glass py-4 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">TM</span>
                </div>
                <span className="font-bold text-xl hidden sm:inline gradient-text">TypeMaster</span>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      pathname === item.href 
                        ? 'bg-primary/10 text-primary font-semibold' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center gap-3">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}