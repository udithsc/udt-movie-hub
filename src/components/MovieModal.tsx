"use client";

import { Fragment, useState, useEffect, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, PlayIcon, CalendarIcon, StarIcon, ClockIcon } from "@heroicons/react/24/outline";
import { Movie } from "@/api";
import Image from "next/image";
import useMovieStore from "@/store/useMovieStore";

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
      console.error('Error fetching movie details:', error);
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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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
          <div className="fixed inset-0 bg-black/90" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-[#181818] text-left align-middle shadow-xl transition-all">
                <div className="relative">
                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-20 rounded-full bg-black/70 p-2 hover:bg-black/90 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6 text-white" />
                  </button>

                  {/* Hero Section */}
                  <div className="relative h-[500px] w-full">
                    <Image
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt={movie.title || movie.name || ""}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/60 to-transparent" />
                    
                    {/* Play Trailer Button */}
                    {selectedTrailerKey && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={() => setShowTrailer(true)}
                          className="flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors"
                        >
                          <PlayIcon className="h-6 w-6" />
                          <span>Play Trailer</span>
                        </button>
                      </div>
                    )}

                    {/* Movie Title and Basic Info */}
                    <div className="absolute bottom-8 left-8 right-8">
                      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {movie.title || movie.name}
                      </h1>
                      
                      {movieDetails?.tagline && (
                        <p className="text-xl text-gray-300 italic mb-4">
                          &ldquo;{movieDetails.tagline}&rdquo;
                        </p>
                      )}

                      <div className="flex flex-wrap items-center space-x-6 text-white">
                        <div className="flex items-center space-x-2">
                          <StarIcon className="h-5 w-5 text-yellow-400" />
                          <span className="font-semibold">{movie.vote_average?.toFixed(1)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="h-5 w-5" />
                          <span>
                            {movie.release_date?.split("-")[0] || movie.first_air_date?.split("-")[0]}
                          </span>
                        </div>
                        
                        {movieDetails?.runtime && (
                          <div className="flex items-center space-x-2">
                            <ClockIcon className="h-5 w-5" />
                            <span>{formatRuntime(movieDetails.runtime)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content Sections */}
                  <div className="px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Main Content */}
                      <div className="lg:col-span-2 space-y-6">
                        {/* Overview */}
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                          <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>
                        </div>

                        {/* Genres */}
                        {movieDetails?.genres && movieDetails.genres.length > 0 && (
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-3">Genres</h3>
                            <div className="flex flex-wrap gap-2">
                              {movieDetails.genres.map((genre) => (
                                <span
                                  key={genre.id}
                                  className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm"
                                >
                                  {genre.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Production Companies */}
                        {movieDetails?.production_companies && movieDetails.production_companies.length > 0 && (
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-3">Production</h3>
                            <div className="flex flex-wrap gap-4">
                              {movieDetails.production_companies.slice(0, 4).map((company, index) => (
                                <div key={index} className="flex items-center space-x-2 text-gray-300">
                                  {company.logo_path && (
                                    <Image
                                      src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                                      alt={company.name}
                                      width={30}
                                      height={30}
                                      className="object-contain bg-white rounded p-1"
                                    />
                                  )}
                                  <span>{company.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Sidebar */}
                      <div className="space-y-6">
                        {/* Stats */}
                        <div className="bg-gray-800/50 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-white mb-4">Details</h3>
                          <div className="space-y-3 text-sm">
                            <div>
                              <span className="text-gray-400">Rating:</span>
                              <span className="text-white ml-2">{movie.vote_average?.toFixed(1)}/10</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Votes:</span>
                              <span className="text-white ml-2">{movie.vote_count?.toLocaleString()}</span>
                            </div>
                            {movieDetails?.budget && movieDetails.budget > 0 && (
                              <div>
                                <span className="text-gray-400">Budget:</span>
                                <span className="text-white ml-2">{formatCurrency(movieDetails.budget)}</span>
                              </div>
                            )}
                            {movieDetails?.revenue && movieDetails.revenue > 0 && (
                              <div>
                                <span className="text-gray-400">Revenue:</span>
                                <span className="text-white ml-2">{formatCurrency(movieDetails.revenue)}</span>
                              </div>
                            )}
                            {movieDetails?.production_countries && movieDetails.production_countries.length > 0 && (
                              <div>
                                <span className="text-gray-400">Country:</span>
                                <span className="text-white ml-2">
                                  {movieDetails.production_countries.map(c => c.name).join(', ')}
                                </span>
                              </div>
                            )}
                            {movieDetails?.spoken_languages && movieDetails.spoken_languages.length > 0 && (
                              <div>
                                <span className="text-gray-400">Language:</span>
                                <span className="text-white ml-2">
                                  {movieDetails.spoken_languages.map(l => l.english_name).join(', ')}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trailer Modal */}
                {showTrailer && selectedTrailerKey && (
                  <div className="absolute inset-0 bg-black/95 z-30 flex items-center justify-center">
                    <button
                      onClick={() => setShowTrailer(false)}
                      className="absolute right-4 top-4 z-40 rounded-full bg-black/70 p-2 hover:bg-black/90"
                    >
                      <XMarkIcon className="h-6 w-6 text-white" />
                    </button>
                    
                    <div className="w-full max-w-5xl mx-4">
                      <div className="aspect-video w-full overflow-hidden rounded-lg">
                        <iframe
                          className="h-full w-full"
                          src={`https://www.youtube.com/embed/${selectedTrailerKey}?autoplay=1&rel=0`}
                          title="Movie Trailer"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default MovieModal;
