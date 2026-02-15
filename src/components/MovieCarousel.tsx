'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Thumbnail from './Thumbnail';
import { Movie } from '@/api';

interface CarouselProps {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
}

export function MovieCarousel({ title, movies, isLoading = false }: CarouselProps) {
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
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
      setTimeout(checkScroll, 500);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className='px-4 md:px-8 py-8 space-y-4'
    >
      <motion.h2 className='text-2xl md:text-3xl font-black text-white'>
        {title}
      </motion.h2>

      <div className='relative group'>
        {/* Carousel Container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className='flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth'
        >
          {isLoading ? (
            // Skeleton loaders
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className='flex-shrink-0 w-64 md:w-80 h-40 bg-gray-700 rounded-lg animate-pulse' />
            ))
          ) : (
            movies.map((movie) => (
              <div key={movie.id} className='flex-shrink-0 w-64 md:w-80'>
                <Thumbnail movie={movie} />
              </div>
            ))
          )}
        </div>

        {/* Left Arrow */}
        {canScrollLeft && (
          <motion.button
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1, scale: 1.1 }}
            onClick={() => scroll('left')}
            className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full hidden group-hover:flex items-center justify-center transition-all backdrop-blur-sm'
          >
            <ChevronLeftIcon className='h-6 w-6' />
          </motion.button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <motion.button
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1, scale: 1.1 }}
            onClick={() => scroll('right')}
            className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full hidden group-hover:flex items-center justify-center transition-all backdrop-blur-sm'
          >
            <ChevronRightIcon className='h-6 w-6' />
          </motion.button>
        )}
      </div>
    </motion.section>
  );
}

export default MovieCarousel;
