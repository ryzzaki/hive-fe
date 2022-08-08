import React from 'react';
import HexagonIcon from '../assets/icons/hexagon.svg';
import Button from './button';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => (
  <nav className="flex justify-between sticky top-10 z-10 max-w-1200 w-full mx-auto p-20 rounded-lg border border-gray-400/30 backdrop-blur-sm bg-gray-400/30 shadow-md">
    <div className="flex items-center justify-center space-x-[0.5rem] text-20 font-bold">
      <HexagonIcon className="animate-spin-slow text-amber-500" />
      <div>Hive Protocol</div>
    </div>
    <div className="flex space-x-2rem">
      <Button variation="primary">Swap Token</Button>
      <Button variation="secondary">Connect Wallet</Button>
    </div>
  </nav>
);

export default Navbar;
