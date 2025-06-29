'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { Movie } from '@/api';

interface TrailerSectionProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

function TrailerSection({ movies, onMovieClick }: TrailerSectionProps) {
  const [activeTab, setActiveTab] = useState<'popular' | 'theaters'>('popular');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className='py-12 bg-gray-50'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center space-x-6'>
            <h2 className='text-2xl font-bold text-gray-800'>Latest Trailers</h2>
            
            {/* Toggle Tabs */}
            <div className='flex bg-[#032541] rounded-full p-1'>
              <button
                onClick={() => setActiveTab('popular')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'popular'
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                    : 'text-white hover:text-red-300'
                }`}
              >
                Popular
              </button>
              <button
                onClick={() => setActiveTab('theaters')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'theaters'
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                    : 'text-white hover:text-red-300'
                }`}
              >
                In Theaters
              </button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className='flex space-x-2'>
            <button
              onClick={() => scroll('left')}
              className='p-2 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md'
            >
              <ChevronLeftIcon className='h-5 w-5 text-gray-600' />
            </button>
            <button
              onClick={() => scroll('right')}
              className='p-2 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md'
            >
              <ChevronRightIcon className='h-5 w-5 text-gray-600' />
            </button>
          </div>
        </div>

        {/* Trailers Scroll Container */}
        <div className='relative'>
          <div
            ref={scrollRef}
            className='flex space-x-6 overflow-x-auto scrollbar-hide pb-4'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {movies.slice(0, 10).map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className='flex-shrink-0 w-80 cursor-pointer group'
                onClick={() => onMovieClick(movie)}
              >
                {/* Trailer Card */}
                <div className='bg-white rounded-lg shadow-lg overflow-hidden group-hover:shadow-xl transition-shadow'>
                  {/* Backdrop Image with Play Button */}
                  <div className='relative h-48 bg-gray-200'>
                    <Image
                      src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                      alt={movie.title || movie.name || 'Movie poster'}
                      width={780}
                      height={440}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    
                    {/* Play Button Overlay */}
                    <div className='absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors'>
                      <div className='bg-red-600 rounded-full p-4 group-hover:bg-red-700 transition-colors'>
                        <PlayIcon className='h-8 w-8 text-white ml-1' />
                      </div>
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className='p-4'>
                    <div className='flex items-start space-x-3'>
                      {/* Poster */}
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title || movie.name || 'Movie poster'}
                        width={48}
                        height={72}
                        className='w-12 h-18 object-cover rounded flex-shrink-0'
                      />
                      
                      {/* Details */}
                      <div className='flex-1 min-w-0'>
                        <h3 className='font-semibold text-gray-800 mb-1 line-clamp-1 group-hover:text-red-600 transition-colors'>
                          {movie.title || movie.name}
                        </h3>
                        <p className='text-gray-600 text-sm mb-2'>
                          {movie.release_date || movie.first_air_date}
                        </p>
                        <p className='text-gray-500 text-sm line-clamp-2'>
                          {movie.overview}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrailerSection;