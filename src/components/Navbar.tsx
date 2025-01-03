import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, LogOut, Upload, User, BookOpen, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from './ui/Button';
import { toast } from 'sonner';
import notibitLogo from '@/assets/notibit_logo.png';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const NavItems = () => (
    <>
      {user ? (
        <>
          <Link to="/library" onClick={() => setIsMenuOpen(false)}>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <BookOpen className="mr-2 h-4 w-4" />
              Library
            </Button>
          </Link>
          <Link to="/upload" onClick={() => setIsMenuOpen(false)}>
            <Button variant="primary" size="sm" className="w-full justify-start">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              handleSignOut();
              setIsMenuOpen(false);
            }}
            className="w-full justify-start"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Link to="/sign-in" onClick={() => setIsMenuOpen(false)}>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </Link>
          <Link to="/sign-up" onClick={() => setIsMenuOpen(false)}>
            <Button variant="primary" size="sm" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Sign Up
            </Button>
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={notibitLogo} 
              alt="Notibit Logo" 
              className="h-16 w-12"
            />
            <span className="text-xl font-bold text-gray-900">Notibit</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavItems />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <NavItems />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;