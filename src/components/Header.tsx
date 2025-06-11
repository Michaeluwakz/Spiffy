import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, HelpCircle, LogIn } from 'lucide-react'; // Changed UserCircle to LogIn
import { ThemeToggleButton } from './ThemeToggleButton';

export default function Header() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-headline text-primary hover:text-primary/80 transition-colors">
          SCC
        </Link>
        <nav className="flex items-center space-x-2 md:space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center space-x-1">
              <Home size={20} />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/faq" className="flex items-center space-x-1">
              <HelpCircle size={20} />
              <span className="hidden sm:inline">FAQ</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/account" className="flex items-center space-x-1">
              <LogIn size={20} /> {/* Changed Icon */}
              <span className="hidden sm:inline">Portal</span> {/* Changed Text */}
            </Link>
          </Button>
          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
}
