'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='relative bg-gradient-to-r from-[#90cea1] to-[#01b4e4] text-white'
    >
      {/* Background Image Overlay */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20'
        style={{
          backgroundImage: "url('https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg')"
        }}
      />
      
      <div className='relative z-10 container mx-auto px-4 py-20'>
        <div className='max-w-4xl'>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className='text-5xl md:text-6xl font-bold mb-4'>
              Welcome.
            </h1>
            <p className='text-xl md:text-2xl mb-8 text-white/90'>
              Millions of movies, TV shows and people to discover. Explore now.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.form
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onSubmit={handleSubmit}
            className='flex items-center bg-white rounded-full shadow-lg overflow-hidden max-w-2xl'
          >
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search for a movie, tv show, person...'
              className='flex-1 px-6 py-4 text-gray-800 text-lg placeholder-gray-500 focus:outline-none'
            />
            <button
              type='submit'
              className='bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-6 font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center space-x-2'
            >
              <span>Search</span>
              <MagnifyingGlassIcon className='h-5 w-5' />
            </button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}

export default HeroSection;