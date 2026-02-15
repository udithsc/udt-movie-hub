'use client';

import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, PlayIcon, InformationCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Movie } from '@/api';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  trendingMovies?: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

function HeroSection({ onSearch, trendingMovies = [], onMovieClick }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = trendingMovies.slice(0, 5); // Use top 5 trending movies as banners

  useEffect(() => {
    if (banners.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const current = banners[currentSlide];

  if (banners.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='relative text-white overflow-hidden pt-16 bg-gradient-to-b from-red-600/20 via-gray-950 to-gray-950'
      >
        <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-gray-950' />
        <div className='relative z-10 container mx-auto px-4 py-32 md:py-48 flex items-center justify-center'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4'></div>
            <p className='text-gray-400'>Loading trending movies...</p>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='relative text-white overflow-hidden pt-16 h-screen max-h-[700px]'
    >
      {/* Netflix-style background */}
      <div className='absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-950 to-gray-950' />

      {/* Animated movie banner */}
      <AnimatePresence mode='wait'>
        {current && current.backdrop_path && (
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            className='absolute inset-0'
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${current.backdrop_path}`}
              alt={current.title || current.name || ''}
              fill
              className='object-cover'
              priority
              sizes='100vw'
            />
            
            {/* Netflix-style gradient overlays */}
            <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60' />
            <div className='absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent' />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated background blobs */}
      <div className='absolute top-1/4 left-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl opacity-30 pointer-events-none' />
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-20 pointer-events-none' />

      {/* Content */}
      <div className='relative z-20 container mx-auto px-4 h-full flex flex-col justify-center py-20 md:py-32'>
        <div className='max-w-3xl space-y-6'>
          {/* Movie info */}
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentSlide}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className='space-y-4'
            >
              <motion.div>
                <h1 className='text-5xl md:text-7xl font-black leading-tight mb-2 drop-shadow-2xl'>
                  {current.title || current.name}
                </h1>
                
                {/* Rating and info badges */}
                <div className='flex items-center gap-4 mb-4 flex-wrap'>
                  <div className='flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full'>
                    <span className='text-yellow-400 font-bold'>{current.vote_average?.toFixed(1)}</span>
                    <span className='text-gray-300 text-sm'>Rating</span>
                  </div>
                  {current.release_date && (
                    <div className='bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-300'>
                      {new Date(current.release_date).getFullYear()}
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className='text-lg md:text-xl text-gray-200 line-clamp-3 max-w-2xl drop-shadow-lg'
              >
                {current.overview}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className='flex gap-3 flex-wrap'
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onMovieClick?.(current)}
              className='flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl'
            >
              <PlayIcon className='h-5 w-5' />
              Play Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/30 transition-all backdrop-blur-sm border border-white/30'
            >
              <PlusIcon className='h-5 w-5' />
              My List
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/20 transition-all backdrop-blur-sm'
            >
              <InformationCircleIcon className='h-5 w-5' />
              Info
            </motion.button>
          </motion.div>

          {/* Search Bar */}
          <motion.form
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            onSubmit={handleSubmit}
            className='mt-8 pt-4'
          >
            <div className='flex items-center bg-white/10 backdrop-blur-md rounded-full shadow-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all max-w-xl'>
              <MagnifyingGlassIcon className='h-6 w-6 text-white/60 ml-4' />
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search movies, shows, people...'
                className='flex-1 px-6 py-4 text-white placeholder-gray-400 text-lg focus:outline-none bg-transparent'
              />
              <motion.button
                type='submit'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold transition-colors'
              >
                Search
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>

      {/* Carousel indicators - Netflix style dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2'
      >
        {banners.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            animate={{
              width: idx === currentSlide ? 28 : 10,
              backgroundColor: idx === currentSlide ? '#e50914' : 'rgba(255, 255, 255, 0.5)',
            }}
            className='h-2 rounded-full transition-all'
          />
        ))}
      </motion.div>
    </motion.section>
  );
}

export default HeroSection;