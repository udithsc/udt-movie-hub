'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md shadow-xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
      }`}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Left Section - Logo and Navigation */}
          <div className='flex items-center space-x-8'>
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className='flex items-center'
            >
              <Link href='/' className='flex items-center gap-2'>
                <div className='text-2xl font-bold text-red-600'>
                  🎬
                </div>
                <span className='hidden sm:inline font-bold text-white text-lg'>MovieHub</span>
              </Link>
            </motion.div>

            {/* Navigation Links */}
            <nav className='hidden md:flex space-x-6'>
              {['Movies', 'TV Shows', 'Trending', 'My List'].map((item) => (
                <motion.div key={item} whileHover={{ color: '#e50914' }} className='cursor-pointer text-white/90 hover:text-red-600 text-sm font-medium transition-colors'>
                  {item}
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Right Section - Search and User Actions */}
          <div className='flex items-center space-x-4'>
            <motion.div
              initial={{ width: 40 }}
              animate={{ width: showSearch ? 200 : 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className='relative'
            >
              {showSearch ? (
                <form onSubmit={handleSearch} className='w-full flex items-center'>
                  <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search...'
                    className='w-full bg-white/20 text-white placeholder-gray-300 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white/30 transition-all'
                    autoFocus
                  />
                </form>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setShowSearch(true)}
                  className='flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors'
                >
                  <MagnifyingGlassIcon className='h-5 w-5 text-white' />
                </motion.button>
              )}
            </motion.div>

            {showSearch && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
                className='text-gray-300 hover:text-white transition-colors'
              >
                <XMarkIcon className='h-5 w-5' />
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              className='hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors'
            >
              <BellIcon className='h-5 w-5 text-white' />
            </motion.button>

            {/* User Avatar */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className='w-8 h-8 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center cursor-pointer font-bold text-white text-sm hover:shadow-lg hover:shadow-red-600/50 transition-all'
            >
              U
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
