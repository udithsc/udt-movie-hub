import React from 'react';
import Image from 'next/image';

function Footer() {
  return (
    <footer className='bg-[#0a0a0a] border-t border-gray-800 text-white py-16'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Logo and Description */}
          <div className='md:col-span-1'>
            <div className='flex items-center mb-4'>
              <Image
                src='/logo.png'
                alt='UDT Movies'
                width={120}
                height={40}
                className='object-contain'
              />
            </div>
            <p className='text-sm text-gray-300 mb-6'>
              Discover millions of movies, TV shows and people. Explore now.
            </p>
          </div>

          {/* The Basics */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>THE BASICS</h3>
            <ul className='space-y-2 text-sm'>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>About UDT</a></li>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>Contact Us</a></li>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>Support Forums</a></li>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>API</a></li>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>System Status</a></li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>GET INVOLVED</h3>
            <ul className='space-y-2 text-sm'>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>Contribution Bible</a></li>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>Add New Movie</a></li>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>Add New TV Show</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>COMMUNITY</h3>
            <ul className='space-y-2 text-sm'>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>Guidelines</a></li>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>Discussions</a></li>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>Leaderboard</a></li>
              <li><a href='#' className='text-gray-300 hover:text-white transition-colors'>Twitter</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-12 pt-8 border-t border-gray-600 text-center'>
          <p className='text-sm text-gray-400'>
            &copy; {new Date().getFullYear()} UDT Movies. Built with Next.js and powered by TMDB API.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
