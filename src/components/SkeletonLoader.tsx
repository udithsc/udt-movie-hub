'use client';

import { motion } from 'framer-motion';

export function SkeletonLoading() {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
      className="bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse"
    />
  );
}

export function ThumbSkeleton() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-800">
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800"
      />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative w-full h-96 bg-gray-800 rounded-lg overflow-hidden">
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800"
      />
    </div>
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="space-y-3">
      <ThumbSkeleton />
      <div className="space-y-2 px-1">
        <SkeletonLoading />
        <div className="h-4 bg-gray-700 rounded w-3/4" />
      </div>
    </div>
  );
}

export default function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}
