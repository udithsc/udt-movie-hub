'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface RatingBadgeProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function RatingBadge({ rating, size = 'md', showText = true, className = '' }: RatingBadgeProps) {
  const stars = Math.round((rating / 10) * 5);
  const displayRating = (rating / 2).toFixed(1);

  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center gap-1 ${className}`}
    >
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`${sizeClasses[size]} ${
              i < stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
            }`}
          />
        ))}
      </div>
      {showText && (
        <span className="text-xs font-semibold text-gray-300 ml-1">{displayRating}</span>
      )}
    </motion.div>
  );
}

export function RatingCircle({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  };

  const displayRating = Math.round((rating / 10) * 100);
  const color = displayRating >= 75 ? 'bg-green-600' : displayRating >= 50 ? 'bg-yellow-600' : 'bg-red-600';

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`flex items-center justify-center rounded-full ${color} font-bold text-white ${sizeClasses[size]}`}
    >
      {displayRating}%
    </motion.div>
  );
}
