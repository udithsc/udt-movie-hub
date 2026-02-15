"use client";

import { Movie } from "@/api";
import Image from "next/image";
import { motion } from "framer-motion";
import useMovieStore from "@/store/useMovieStore";
import { RatingBadge } from "./RatingBadge";
import { PlayIcon } from "@heroicons/react/24/solid";

interface ThumbnailProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}

function Thumbnail({ movie, onClick }: ThumbnailProps) {
  const { setSelectedMovie, openModal } = useMovieStore();

  const handleClick = () => {
    if (onClick) {
      onClick(movie);
    } else {
      setSelectedMovie(movie);
      openModal();
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ scale: 1.08, y: -20 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative cursor-pointer group"
    >
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
        <Image
          src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
          }`}
          alt={movie.title || movie.original_name || ""}
          fill
          className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 180px, 260px"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content that appears on hover */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-4 space-y-2"
        >
          <h3 className="text-sm font-bold text-white line-clamp-2">
            {movie.title || movie.original_name}
          </h3>

          <div className="flex items-center justify-between">
            <RatingBadge rating={movie.vote_average} size="sm" showText={true} />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-red-600 hover:bg-red-700 rounded-full p-2 transition-colors"
            >
              <PlayIcon className="h-4 w-4 text-white" />
            </motion.button>
          </div>

          {movie.media_type && (
            <span className="inline-block text-xs px-2 py-1 bg-red-600/80 text-white rounded">
              {movie.media_type}
            </span>
          )}
        </motion.div>

        {/* Rating circle - always visible */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute top-2 right-2 z-10"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm">
            <span className="text-xs font-bold text-yellow-400">
              {(movie.vote_average / 2).toFixed(1)}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Thumbnail;
