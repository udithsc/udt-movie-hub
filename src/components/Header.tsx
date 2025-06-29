'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, PlusIcon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

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
      className='bg-[#032541] text-white sticky top-0 z-50 shadow-lg'
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Left Section - Logo and Navigation */}
          <div className='flex items-center space-x-8'>
            {/* Your Logo */}
            <div className='flex items-center'>
              <Link href='/'>
                <Image
                  className='object-contain cursor-pointer'
                  src='/logo.png'
                  width={120}
                  height={40}
                  alt='UDT Logo'
                  priority
                />
              </Link>
            </div>
            
            {/* Navigation Links */}
            <nav className='hidden md:flex space-x-6'>
              <Link href='/' className='hover:text-red-500 transition-colors'>Movies</Link>
              <a href='#' className='hover:text-red-500 transition-colors'>TV Shows</a>
              <a href='#' className='hover:text-red-500 transition-colors'>People</a>
              <a href='#' className='hover:text-red-500 transition-colors'>More</a>
            </nav>
          </div>

          {/* Right Section - Search and User Actions */}
          <div className='flex items-center space-x-4'>
            <PlusIcon className='h-6 w-6 hover:text-red-500 cursor-pointer transition-colors' />
            <div className='relative'>
              <button className='flex items-center space-x-1 border border-white/20 rounded-full px-3 py-1 hover:bg-white/10 transition-colors'>
                <span className='text-sm'>EN</span>
              </button>
            </div>
            <BellIcon className='h-6 w-6 hover:text-red-500 cursor-pointer transition-colors' />
            
            {/* Search */}
            {showSearch ? (
              <form onSubmit={handleSearch} className='flex items-center'>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search movies...'
                  className='bg-white/10 text-white placeholder-gray-300 px-3 py-1 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-48'
                  autoFocus
                />
                <button
                  type='button'
                  onClick={() => setShowSearch(false)}
                  className='ml-2 h-6 w-6 hover:text-red-500 cursor-pointer transition-colors'
                >
                  <XMarkIcon className='h-6 w-6' />
                </button>
              </form>
            ) : (
              <MagnifyingGlassIcon 
                className='h-6 w-6 hover:text-red-500 cursor-pointer transition-colors'
                onClick={() => setShowSearch(true)}
              />
            )}
            
            {/* User Avatar */}
            <div className='w-8 h-8 bg-red-600 rounded-full flex items-center justify-center cursor-pointer'>
              <span className='text-sm font-bold text-white'>U</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
