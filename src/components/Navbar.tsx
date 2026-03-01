import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { WashingMachine, User, LogOut, Menu, X } from 'lucide-react';
import { storage } from '../utils/storage';
import { User as UserType } from '../types';

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setCurrentUser(storage.getCurrentUser());
  }, [location]);

  const handleLogout = () => {
    storage.setCurrentUser(null);
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <WashingMachine className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-900 tracking-tight">Wash Karo</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
            {currentUser ? (
              <>
                <Link to="/book" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Book Now</Link>
                <Link to="/tracking" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">My Orders</Link>
                {currentUser.isAdmin && (
                  <Link to="/admin" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">Admin</Link>
                )}
                <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <User className="h-5 w-5" />
                    <span className="font-medium">{currentUser.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Login</Link>
                <Link to="/signup" className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-blue-50 px-4 py-4 space-y-4 shadow-xl">
          <Link to="/" className="block text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
          {currentUser ? (
            <>
              <Link to="/book" className="block text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Book Now</Link>
              <Link to="/tracking" className="block text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
              {currentUser.isAdmin && (
                <Link to="/admin" className="block text-blue-600 font-bold" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
              )}
              <button 
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className="w-full text-left text-red-500 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <Link to="/login" className="block text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="block bg-blue-600 text-white px-6 py-2 rounded-full text-center font-medium" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
