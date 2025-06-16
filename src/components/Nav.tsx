'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import requests from '@/utils/api';
import useMovieStore from '@/store/useMovieStore';

interface Request {
  url: string;
}

interface Requests {
  [key: string]: Request;
}

function Nav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetchMoviesByGenre, setSelectedGenre, selectedGenre } =
    useMovieStore();

  const handleClick = (key: string) => {
    if (key === selectedGenre) return;

    const params = new URLSearchParams(searchParams);
    params.set('genre', key);
    router.push(`/?${params.toString()}`);
    setSelectedGenre(key);
    fetchMoviesByGenre(key);
  };

  return (
    <nav className='relative'>
      <div className='flex px-10 sm:px-20 text-2xl whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll scrollbar-hide'>
        {Object.entries(requests).map(([key, { url }]) => (
          <h2
            key={key}
            onClick={() => handleClick(key)}
            className={`last:pr-24 cursor-pointer transition duration-100 transform hover:scale-125 hover:text-white active:text-red-500 ${
              searchParams.get('genre') === key
                ? 'text-white scale-125'
                : 'text-gray-300'
            }`}
          >
            {key
              .replace('fetch', '')
              .replace(/([A-Z])/g, ' $1')
              .trim()}
          </h2>
        ))}
      </div>
      <div className='absolute top-0 right-0 bg-gradient-to-l from-[#06202A] h-10 w-1/12' />
    </nav>
  );
}

export default Nav;
