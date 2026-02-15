"use client";

import { Fragment, useState, useEffect, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, PlayIcon, CalendarIcon, StarIcon, ClockIcon, ShareIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Movie } from "@/api";
import Image from "next/image";
import { motion } from "framer-motion";
import useMovieStore from "@/store/useMovieStore";
import { RatingCircle } from "./RatingBadge";

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

interface MovieDetails {
  genres: { id: number; name: string }[];
  runtime: number;
  production_countries: { name: string }[];
  spoken_languages: { english_name: string }[];
  tagline: string;
  budget: number;
  revenue: number;
  production_companies: { name: string; logo_path: string }[];
}

function MovieModal({ movie, isOpen, onClose }: MovieModalProps) {
  const { selectedTrailerKey } = useMovieStore();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const fetchMovieDetails = useCallback(async () => {
    if (!movie) return;

    try {
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
      );

      if (response.ok) {
        const details = await response.json();
        setMovieDetails(details);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }, [movie]);

  useEffect(() => {
    if (movie && isOpen) {
      setShowTrailer(false);
      fetchMovieDetails();
    } else if (!isOpen) {
      setShowTrailer(false);
      setMovieDetails(null);
    }
  }, [movie, isOpen, fetchMovieDetails]);

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (!movie) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/95 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-10"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-10"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-gray-900 text-white shadow-2xl transition-all">
                {/* Close button - Floating */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="absolute right-4 top-4 z-20 rounded-full bg-black/70 p-2 hover:bg-red-600 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.button>

                <div className="relative">
                  {/* Hero Section */}
                  <div className="relative h-96 w-full overflow-hidden bg-gray-800">
                    <Image
                      src={`https://image.tmdb.org/t/p/original${
                        movie.backdrop_path || movie.poster_path
                      }`}
                      alt={movie.title || movie.name || ""}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

                    {/* Play Trailer Button */}
                    {selectedTrailerKey && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowTrailer(true)}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold transition-colors shadow-2xl"
                      >
                        <PlayIcon className="h-6 w-6" />
                        <span>Watch Trailer</span>
                      </motion.button>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12 space-y-8">
                    {/* Title and Meta Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-4"
                    >
                      <div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
                          {movie.title || movie.name}
                        </h1>
                        {movieDetails?.tagline && (
                          <p className="text-lg text-gray-300 italic">
                            &ldquo;{movieDetails.tagline}&rdquo;
                          </p>
                        )}
                      </div>

                      {/* Quick Stats */}
                      <div className="flex flex-wrap items-center gap-4 pt-4">
                        <RatingCircle rating={movie.vote_average} size="md" />

                        {movie.release_date && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <CalendarIcon className="h-5 w-5" />
                            <span className="font-medium">
                              {new Date(movie.release_date).getFullYear()}
                            </span>
                          </div>
                        )}

                        {movieDetails?.runtime && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <ClockIcon className="h-5 w-5" />
                            <span className="font-medium">
                              {formatRuntime(movieDetails.runtime)}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex gap-3 flex-wrap"
                    >
                      {selectedTrailerKey && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowTrailer(true)}
                          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                        >
                          <PlayIcon className="h-5 w-5" />
                          Play
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors"
                      >
                        <PlusIcon className="h-5 w-5" />
                        Add to List
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors"
                      >
                        <ShareIcon className="h-5 w-5" />
                        Share
                      </motion.button>
                    </motion.div>

                    {/* Overview */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-3"
                    >
                      <h2 className="text-2xl font-bold">About</h2>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {movie.overview}
                      </p>
                    </motion.div>

                    {/* Grid Layout for Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Left Column */}
                      <div className="md:col-span-2 space-y-8">
                        {/* Genres */}
                        {movieDetails?.genres && movieDetails.genres.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <h3 className="text-xl font-bold mb-4">Genres</h3>
                            <div className="flex flex-wrap gap-2">
                              {movieDetails.genres.map((genre) => (
                                <motion.span
                                  key={genre.id}
                                  whileHover={{ scale: 1.05 }}
                                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-red-600/50 transition-all cursor-pointer"
                                >
                                  {genre.name}
                                </motion.span>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Production Companies */}
                        {movieDetails?.production_companies &&
                          movieDetails.production_companies.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                            >
                              <h3 className="text-xl font-bold mb-4">Production</h3>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {movieDetails.production_companies
                                  .slice(0, 6)
                                  .map((company, index) => (
                                    <div
                                      key={index}
                                      className="flex flex-col items-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                      {company.logo_path && (
                                        <Image
                                          src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                                          alt={company.name}
                                          width={50}
                                          height={50}
                                          className="object-contain"
                                        />
                                      )}
                                      <span className="text-xs text-gray-300 text-center line-clamp-2">
                                        {company.name}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            </motion.div>
                          )}
                      </div>

                      {/* Right Column - Details Box */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 space-y-4 border border-gray-700"
                      >
                        <h3 className="text-xl font-bold">Details</h3>

                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between pb-3 border-b border-gray-700">
                            <span className="text-gray-400">Rating</span>
                            <span className="font-bold text-white">
                              {movie.vote_average?.toFixed(1)}/10
                            </span>
                          </div>

                          <div className="flex justify-between pb-3 border-b border-gray-700">
                            <span className="text-gray-400">Votes</span>
                            <span className="font-bold text-white">
                              {(movie.vote_count / 1000).toFixed(1)}K
                            </span>
                          </div>

                          {movieDetails?.budget && movieDetails.budget > 0 && (
                            <div className="flex justify-between pb-3 border-b border-gray-700">
                              <span className="text-gray-400">Budget</span>
                              <span className="font-bold text-white">
                                {formatCurrency(movieDetails.budget)}
                              </span>
                            </div>
                          )}

                          {movieDetails?.revenue && movieDetails.revenue > 0 && (
                            <div className="flex justify-between pb-3 border-b border-gray-700">
                              <span className="text-gray-400">Revenue</span>
                              <span className="font-bold text-white">
                                {formatCurrency(movieDetails.revenue)}
                              </span>
                            </div>
                          )}

                          {movieDetails?.production_countries &&
                            movieDetails.production_countries.length > 0 && (
                              <div className="flex justify-between pb-3 border-b border-gray-700">
                                <span className="text-gray-400">Country</span>
                                <span className="text-right font-bold text-white text-xs">
                                  {movieDetails.production_countries
                                    .map((c) => c.name)
                                    .join(", ")}
                                </span>
                              </div>
                            )}

                          {movieDetails?.spoken_languages &&
                            movieDetails.spoken_languages.length > 0 && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">Languages</span>
                                <span className="text-right font-bold text-white text-xs">
                                  {movieDetails.spoken_languages
                                    .map((l) => l.english_name)
                                    .join(", ")}
                                </span>
                              </div>
                            )}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Trailer Modal */}
                <AnimatePresence>
                  {showTrailer && selectedTrailerKey && (
                    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setShowTrailer(false)}
                        className="absolute right-4 top-4 z-40 rounded-full bg-black/70 p-2 hover:bg-red-600 transition-colors"
                      >
                        <XMarkIcon className="h-6 w-6 text-white" />
                      </motion.button>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="w-full max-w-5xl mx-4"
                      >
                        <div className="aspect-video w-full overflow-hidden rounded-lg shadow-2xl">
                          <iframe
                            className="h-full w-full"
                            src={`https://www.youtube.com/embed/${selectedTrailerKey}?autoplay=1&rel=0`}
                            title="Movie Trailer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

import { AnimatePresence } from "framer-motion";

export default MovieModal;
