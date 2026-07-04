import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import {isLoggedIn, isStudent, logout} from '../auth/service/AuthService';
import useCart from "../cart/useCart.tsx";

export default function HeaderComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const beLoggedIn = isLoggedIn();
  const beStudent = isStudent();
  const navigator = useNavigate();
  const {items} = useCart();
  const logoutHandler = () =>{
    logout();
    navigator('/login');
  }
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center gap-4">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
              U<span className="text-gray-900">demyClone</span>
            </Link>
          </div>

          {/* Categories (Udemy Style) */}
          <div className="hidden md:flex items-center">
            <button className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
              Categories
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl hidden sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for anything (Python, SEO, Web Dev...)"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-full text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Side Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/teach" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
              Teach on Udemy
            </Link>
            {
              beStudent && (
                    <Link to="/enrolled-courses" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                      Enrolled Courses
                    </Link>
                )
            }

            
            {/* Cart Icon */}
            <Link to="/cart" className="text-gray-700 hover:text-indigo-600 relative p-2 transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-indigo-600 rounded-full">{items.length}</span>
            </Link>

            {/* Auth Buttons */}
            {
              !beLoggedIn &&
               <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50 transition-all duration-200"
            >
              Log in
            </Link>
            }
           
            {
              beLoggedIn &&
                 <button onClick={logoutHandler} 
                 className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50 transition-all duration-200">
              Logout
            </button>
            }
           {
            !beLoggedIn &&
              <Link 
              to="/register" 
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 shadow-sm transition-all duration-200"
            >
              Sign up
            </Link>
           }
          
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button className="sm:hidden text-gray-700 p-1">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none p-1"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-3 shadow-inner">
          <Link to="/login" className="block w-full text-center px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50">
            Log in
          </Link>
          <Link to="/register" className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
            Sign up
          </Link>
          <hr className="border-gray-200" />
          <Link to="/teach" className="block text-sm font-medium text-gray-700 hover:text-indigo-600 py-1">
            Teach on Udemy
          </Link>
          <button className="block text-left w-full text-sm font-medium text-gray-700 hover:text-indigo-600 py-1">
            Categories
          </button>
        </div>
      )}
    </nav>
  );
}