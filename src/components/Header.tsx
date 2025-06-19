'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Nav from './Nav';

function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className='flex flex-col sm:flex-row items-center justify-between m-5 h-auto relative bg-[#06202A] rounded-lg p-4 shadow-lg gap-4'
    >
      {/* Logo */}
      <div className='flex-shrink-0 flex items-center mb-4 sm:mb-0'>
        <Image
          className='object-contain'
          src='/logo.png'
          width={120}
          height={60}
          alt='UDT Logo'
          priority
        />
      </div>

      {/* Genre List */}
      <div className='w-full sm:flex-1 flex justify-center mb-4 sm:mb-0'>
        <Nav />
      </div>
    </motion.header>
  );
}

export default Header;
