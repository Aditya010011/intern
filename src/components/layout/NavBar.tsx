
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TechMentor
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-primary">
                <span>Technologies</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                <div className="py-1 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Link to="/tech/python" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary">Python</Link>
                  <Link to="/tech/devops" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary">DevOps</Link>
                  <Link to="/tech/cloud" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary">Cloud Computing</Link>
                  <Link to="/tech/linux" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary">Linux</Link>
                  <Link to="/tech/networking" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary">Networking</Link>
                  <Link to="/tech/storage" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary">Storage</Link>
                  <Link to="/tech/virtualization" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary">Virtualization</Link>
                  <Link to="/tech/objectstorage" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary">Object Storage</Link>
                  <Link to="/tech/ai" className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary">AI & Machine Learning</Link>
                </div>
              </div>
            </div>
            <Link to="/playground" className="text-gray-600 hover:text-primary">
              Playground
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary">
              Contact
            </Link>
            {user ? (
              <Button onClick={() => navigate('/dashboard')} variant="outline" className="ml-4">
                Dashboard
              </Button>
            ) : (
              <>
                <Button onClick={() => navigate('/login')} variant="outline" className="ml-4">
                  Sign In
                </Button>
                <Button onClick={() => navigate('/signup')}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <button className="flex items-center justify-between w-full text-gray-600 hover:text-primary">
                  <span>Technologies</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="mt-2 ml-4 space-y-2">
                  <Link to="/tech/python" className="block text-sm hover:text-primary">Python</Link>
                  <Link to="/tech/devops" className="block text-sm hover:text-primary">DevOps</Link>
                  <Link to="/tech/cloud" className="block text-sm hover:text-primary">Cloud Computing</Link>
                  <Link to="/tech/linux" className="block text-sm hover:text-primary">Linux</Link>
                  <Link to="/tech/networking" className="block text-sm hover:text-primary">Networking</Link>
                  <Link to="/tech/storage" className="block text-sm hover:text-primary">Storage</Link>
                  <Link to="/tech/virtualization" className="block text-sm hover:text-primary">Virtualization</Link>
                  <Link to="/tech/objectstorage" className="block text-sm hover:text-primary">Object Storage</Link>
                  <Link to="/tech/ai" className="block text-sm hover:text-primary">AI & Machine Learning</Link>
                </div>
              </div>
              <Link to="/playground" className="text-gray-600 hover:text-primary">
                Playground
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-primary">
                About
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-primary">
                Contact
              </Link>
              {user ? (
                <Button onClick={() => navigate('/dashboard')} variant="outline" className="w-full">
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button onClick={() => navigate('/login')} variant="outline" className="w-full">
                    Sign In
                  </Button>
                  <Button onClick={() => navigate('/signup')} className="w-full">
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
