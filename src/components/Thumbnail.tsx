"use client";

import { Movie } from "@/api";
import Image from "next/image";
import { motion } from "framer-motion";
import useMovieStore from "@/store/useMovieStore";

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
      className="relative cursor-pointer transition duration-200 ease-out hover:scale-105"
    >
      <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
          }`}
          alt={movie.title || movie.original_name || ""}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 180px, 260px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2">
          <h3 className="text-sm font-semibold text-white line-clamp-1">
            {movie.title || movie.original_name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export default Thumbnail;
