"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Movie } from "@/utils/api";
import Image from "next/image";

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

function MovieModal({ movie, isOpen, onClose }: MovieModalProps) {
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
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-[#181818] text-left align-middle shadow-xl transition-all">
                <div className="relative">
                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 rounded-full bg-black/70 p-2 hover:bg-black/90"
                  >
                    <XMarkIcon className="h-6 w-6 text-white" />
                  </button>

                  {/* Movie backdrop */}
                  <div className="relative h-[400px] w-full">
                    <Image
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt={movie.title || movie.original_name || ""}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent" />
                  </div>

                  {/* Movie details */}
                  <div className="relative -mt-16 px-8 pb-8">
                    <h2 className="text-3xl font-bold text-white">
                      {movie.title || movie.original_name}
                    </h2>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-400">
                      <span>
                        {movie.release_date?.split("-")[0] ||
                          movie.first_air_date?.split("-")[0]}
                      </span>
                      <span>•</span>
                      <span>{movie.vote_count} votes</span>
                    </div>
                    <p className="mt-4 text-gray-300">{movie.overview}</p>

                    {/* Trailer section */}
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-white">
                        Trailer
                      </h3>
                      <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg bg-black">
                        <iframe
                          className="h-full w-full"
                          src={`https://www.youtube.com/embed/${movie.id}?autoplay=1`}
                          title="Movie Trailer"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default MovieModal;
