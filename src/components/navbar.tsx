import React from 'react';
import HexagonIcon from '../assets/icons/hexagon.svg';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => (
  <nav
    className="flex justify-between sticky top-10 z-10 max-w-1200 w-full mx-auto p-20 bg-offwhite backdrop-blur-sm 
rounded-lg"
  >
    <div className="flex items-center justify-center space-x-[0.5rem] text-18 font-bold">
      <HexagonIcon className="animate-spin-slow" />
      <div>Hive</div>
    </div>
    <div className="flex space-x-2rem">
      <button>Swap Tokens</button>
      <button>Connect Wallet</button>
    </div>
  </nav>
);

export default Navbar;
