'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import { default as HomeIcon } from '@heroicons/react/24/outline/HomeIcon';
import { default as CheckBadgeIcon } from '@heroicons/react/24/outline/CheckBadgeIcon';
import { default as FolderIcon } from '@heroicons/react/24/outline/FolderIcon';
import { default as BoltIcon } from '@heroicons/react/24/outline/BoltIcon';
import { default as UserIcon } from '@heroicons/react/24/outline/UserIcon';
import { default as MagnifyingGlassIcon } from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import HeaderItem from './HeaderItem';
import { motion } from 'framer-motion';
import useMovieStore from '@/store/useMovieStore';
import { useRouter } from 'next/navigation';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchMoviesByQuery } = useMovieStore();
  const router = useRouter();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchMoviesByQuery(searchQuery);
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className='flex flex-col sm:flex-row m-5 justify-between items-center h-auto relative bg-black/30 backdrop-blur-sm rounded-lg p-4 shadow-lg'
    >
      <div className='flex flex-grow justify-evenly max-w-2xl'>
        <HeaderItem title='HOME' Icon={HomeIcon} />
        <HeaderItem title='TRENDING' Icon={BoltIcon} />
        <HeaderItem title='VERIFIED' Icon={CheckBadgeIcon} />
        <HeaderItem title='COLLECTIONS' Icon={FolderIcon} />
        <HeaderItem title='ACCOUNT' Icon={UserIcon} />
      </div>

      <div className='flex items-center gap-4'>
        <motion.form
          onSubmit={handleSearch}
          className='flex items-center gap-2'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.input
            type='text'
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            placeholder='Search movies...'
            className='bg-gray-800/50 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700 w-48 sm:w-64'
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            type='submit'
            className='bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MagnifyingGlassIcon className='h-5 w-5' />
          </motion.button>
        </motion.form>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Image
            className='object-contain'
            src='https://links.papareact.com/ua6'
            width={200}
            height={100}
            alt='Hulu Logo'
          />
        </motion.div>
      </div>
    </motion.header>
  );
}

export default Header;
