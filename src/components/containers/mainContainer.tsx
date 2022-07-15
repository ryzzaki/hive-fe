import React, { ReactNode } from 'react';
import Navbar from '../navbar';

type MainContainerProps = {
  children: ReactNode;
};

const MainContainer: React.FC<MainContainerProps> = ({ children }) => (
  <div className="w-full transition bg-white text-black">
    <Navbar />
    <div className="flex flex-col items-center relative min-h-screen px-1rem py-10">{children}</div>
  </div>
);

export default MainContainer;
