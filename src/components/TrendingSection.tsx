'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Movie } from '@/api';

interface TrendingSectionProps {
  movies: Movie[];
  title: string;
  onMovieClick: (movie: Movie) => void;
}

function TrendingSection({ movies, title, onMovieClick }: TrendingSectionProps) {
  const [activeTab, setActiveTab] = useState<'today' | 'week'>('today');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className='py-12 bg-white'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center space-x-6'>
            <h2 className='text-2xl font-bold text-gray-800'>{title}</h2>
            
            {/* Toggle Tabs */}
            <div className='flex bg-[#032541] rounded-full p-1'>
              <button
                onClick={() => setActiveTab('today')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'today'
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                    : 'text-white hover:text-red-300'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setActiveTab('week')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'week'
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                    : 'text-white hover:text-red-300'
                }`}
              >
                This Week
              </button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className='flex space-x-2'>
            <button
              onClick={() => scroll('left')}
              className='p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
            >
              <ChevronLeftIcon className='h-5 w-5 text-gray-600' />
            </button>
            <button
              onClick={() => scroll('right')}
              className='p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
            >
              <ChevronRightIcon className='h-5 w-5 text-gray-600' />
            </button>
          </div>
        </div>

        {/* Movies Scroll Container */}
        <div className='relative'>
          <div
            ref={scrollRef}
            className='flex space-x-4 overflow-x-auto scrollbar-hide pb-4'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {movies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className='flex-shrink-0 w-40 cursor-pointer group'
                onClick={() => onMovieClick(movie)}
              >
                {/* Movie Poster */}
                <div className='relative mb-3 rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow'>
                  <Image
                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    alt={movie.title || movie.name || 'Movie poster'}
                    width={342}
                    height={240}
                    className='w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  
                  {/* Rating Badge */}
                  <div className='absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full'>
                    {movie.vote_average.toFixed(1)}
                  </div>
                </div>

                {/* Movie Info */}
                <div>
                  <h3 className='font-semibold text-sm text-gray-800 mb-1 line-clamp-2 group-hover:text-red-600 transition-colors'>
                    {movie.title || movie.name}
                  </h3>
                  <p className='text-gray-500 text-xs'>
                    {movie.release_date || movie.first_air_date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrendingSection;