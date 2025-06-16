'use client';

import { default as HandThumbUpIcon } from '@heroicons/react/24/outline/HandThumbUpIcon';
import Image from 'next/image';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface Movie {
  id: number;
  title: string;
  original_name?: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  first_air_date?: string;
  vote_count: number;
  media_type?: string;
}

interface ThumbnailProps {
  movie: Movie;
}

const Thumbnail = forwardRef<HTMLDivElement, ThumbnailProps>(
  ({ movie }, ref) => {
    const BASE_URL = 'http://image.tmdb.org/t/p/original';

    return (
      <motion.div
        ref={ref}
        className='group cursor-pointer p-2 transition duration-200 ease-in transform hover:z-50'
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className='relative overflow-hidden rounded-lg'>
          <Image
            layout='responsive'
            src={
              `${BASE_URL}${movie.backdrop_path || movie.poster_path}` ||
              `${BASE_URL}${movie.poster_path}`
            }
            height={1080}
            width={1920}
            alt={movie.title || movie.original_name || 'Movie thumbnail'}
            className='transform transition duration-300 group-hover:scale-110'
          />
          <motion.div
            className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
        </div>
        <div className='p-2'>
          <motion.p
            className='truncate max-w-md text-gray-300'
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            {movie.overview}
          </motion.p>
          <motion.h2
            className='mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold'
            whileHover={{ scale: 1.02 }}
          >
            {movie.title || movie.original_name}
          </motion.h2>
          <motion.p
            className='flex items-center opacity-0 group-hover:opacity-100 text-gray-300'
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            {movie.media_type && `${movie.media_type} •`}{' '}
            {movie.release_date || movie.first_air_date}•{' '}
            <HandThumbUpIcon className='h-5 mx-2' /> {movie.vote_count}
          </motion.p>
        </div>
      </motion.div>
    );
  }
);

Thumbnail.displayName = 'Thumbnail';

export default Thumbnail;
