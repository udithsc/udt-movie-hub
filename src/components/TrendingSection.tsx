'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Movie } from '@/api';
import Thumbnail from './Thumbnail';

interface TrendingSectionProps {
  movies: Movie[];
  title: string;
  onMovieClick: (movie: Movie) => void;
}

function TrendingSection({ movies, title, onMovieClick }: TrendingSectionProps) {
  const [activeTab, setActiveTab] = useState<'today' | 'week'>('today');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(
        scrollRef.current.scrollLeft <
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
      );
    }
  };

  useEffect(() => {
    checkScroll();
    const timer = setTimeout(checkScroll, 500);
    return () => clearTimeout(timer);
  }, [movies]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 500);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className='py-12'
    >
      <div className='container mx-auto px-4 md:px-8'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='flex items-center justify-between mb-8'
        >
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2.5'>
              <SparklesIcon className='h-6 w-6 text-red-600' />
              <h2 className='text-2xl md:text-3xl font-black text-white'>{title}</h2>
            </div>

            {/* Toggle Tabs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className='flex gap-1 bg-gray-800/50 rounded-full p-1 border border-gray-700'
            >
              {['today', 'week'].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'today' | 'week')}
                  animate={{
                    backgroundColor:
                      activeTab === tab
                        ? 'rgb(220, 38, 38)'
                        : 'transparent',
                    color: activeTab === tab ? '#ffffff' : '#9ca3af',
                  }}
                  className='px-4 py-2 rounded-full text-sm font-semibold transition-all'
                >
                  {tab === 'today' ? 'Today' : 'This Week'}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Movies Carousel */}
        <div className='relative group'>
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className='flex gap-4 overflow-x-scroll scrollbar-hide'
          >
            {movies.map((movie) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className='flex-shrink-0 w-64 md:w-80'
              >
                <div onClick={() => onMovieClick(movie)}>
                  <Thumbnail movie={movie} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              onClick={() => scroll('left')}
              className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full hidden group-hover:flex items-center justify-center transition-all backdrop-blur-sm'
            >
              <ChevronLeftIcon className='h-6 w-6' />
            </motion.button>
          )}

          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              onClick={() => scroll('right')}
              className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full hidden group-hover:flex items-center justify-center transition-all backdrop-blur-sm'
            >
              <ChevronRightIcon className='h-6 w-6' />
            </motion.button>
          )}
        </div>
      </div>
    </motion.section>
  );
}

export default TrendingSection;