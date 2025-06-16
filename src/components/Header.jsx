import Image from 'next/image';
import { default as HomeIcon } from '@heroicons/react/24/outline/HomeIcon';
import { default as CheckBadgeIcon } from '@heroicons/react/24/outline/CheckBadgeIcon';
import { default as FolderIcon } from '@heroicons/react/24/outline/FolderIcon';
import { default as BoltIcon } from '@heroicons/react/24/outline/BoltIcon';
import { default as MagnifyingGlassIcon } from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import { default as UserIcon } from '@heroicons/react/24/outline/UserIcon';
import HeaderItem from './HeaderItem';

function Header() {
  return (
    <header className='flex flex-col sm:flex-row m-5 justify-between items-center h-auto'>
      <div className='flex flex-grow justify-evenly max-w-2xl'>
        <HeaderItem title='HOME' Icon={HomeIcon} />
        <HeaderItem title='TRENDING' Icon={BoltIcon} />
        <HeaderItem title='VERIFIED' Icon={CheckBadgeIcon} />
        <HeaderItem title='COLLECTIONS' Icon={FolderIcon} />
        <HeaderItem title='SEARCH' Icon={MagnifyingGlassIcon} />
        <HeaderItem title='ACCOUNT' Icon={UserIcon} />
      </div>
      <Image
        className='object-contain'
        src='https://links.papareact.com/ua6'
        width={200}
        height={100}
      />
    </header>
  );
}

export default Header;
