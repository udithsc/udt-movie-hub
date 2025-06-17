'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import requests from '@/utils/api';
import useMovieStore from '@/store/useMovieStore';

function Nav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedGenre, clearSearchResults } = useMovieStore();

  const handleClick = (key: string) => {
    if (key === selectedGenre) {
      return;
    }
    clearSearchResults();

    const params = new URLSearchParams(searchParams);
    params.set('genre', key);
    router.push(`/?${params.toString()}`);
  };

  return (
    <nav className='relative w-full'>
      <div
        className='flex px-4 py-3 space-x-3 overflow-x-auto scrollbar-hide bg-[#06202A] rounded-lg shadow-md'
        style={{
          WebkitOverflowScrolling: 'touch',
          maskImage: 'linear-gradient(to right, black 90%, transparent 100%)',
        }}
      >
        {Object.keys(requests).map((key) => (
          <button
            key={key}
            onClick={() => handleClick(key)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-base font-semibold transition-colors duration-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-red-500 shadow-lg
              ${
                selectedGenre === key
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800/70 text-gray-200 hover:bg-gray-700 hover:text-white'
              }
            `}
            style={{ minWidth: 100 }}
          >
            {key
              .replace('fetch', '')
              .replace(/([A-Z])/g, ' $1')
              .trim()}
          </button>
        ))}
      </div>
      <div className='pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#181818] to-transparent' />
    </nav>
  );
}

export default Nav;
