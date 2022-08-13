import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from '../navbar';

type MainContainerProps = {
  children: ReactNode;
};

const MainContainer: React.FC<MainContainerProps> = ({ children }) => (
  <div className="font-main w-full transition bg-black text-white px-20">
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }}
    />
    <Navbar />
    <div className="flex flex-col items-center relative min-h-screen px-1rem py-10">{children}</div>
  </div>
);

export default MainContainer;
