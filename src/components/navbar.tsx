import React from 'react';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => (
  <nav
    className="flex justify-between sticky top-10 z-10 max-w-1200 w-full mx-auto p-20 bg-offwhite backdrop-blur-sm 
rounded-lg"
  >
    <div>Hive</div>
    <div>Connect Wallet</div>
  </nav>
);

export default Navbar;
