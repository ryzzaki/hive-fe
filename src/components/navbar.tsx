import { ethers } from 'ethers';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import HexagonIcon from '../assets/icons/hexagon.svg';
import WalletContext from '../utils/context/WalletContext';
import { isCorrectNetwork } from '../utils/web3';
import Button from './button';
import Swap from './swap';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { wallet, setWallet } = useContext(WalletContext);

  useEffect(() => {
    if (typeof window.ethereum == 'undefined') {
      toast('Web3 wallet is not available', { icon: '❌' });
    } else {
      setIsInstalled(true);
    }
  }, [wallet]);

  const handleConnect = async () => {
    if (!isInstalled) {
      return toast('Web3 wallet is not available', { icon: '❌' });
    }

    if (!(await isCorrectNetwork())) {
      return toast('Switch network to Polygon Mumbai!', { icon: '❌' });
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setWallet(address);
      localStorage.setItem('wallet_context', JSON.stringify({ wallet: address }));
      toast('Wallet connected!', { icon: '🎉' });
    } catch (e) {
      toast('Cannot reach wallet', { icon: '❌' });
    }
  };

  return (
    <>
      <nav className="flex justify-between sticky top-10 z-10 max-w-1200 w-full mx-auto p-20 rounded-lg border border-gray-400/30 backdrop-blur-sm bg-gray-400/30 shadow-md">
        <div className="flex items-center justify-center space-x-[0.5rem] text-20 font-bold">
          <HexagonIcon className="animate-spin-slow text-amber-500" />
          <div>Hive Protocol</div>
        </div>
        <div className="flex space-x-2rem">
          <Button variation="primary" onClick={() => setShowModal(true)}>
            Swap Token
          </Button>
          <Button variation="secondary" onClick={handleConnect}>
            {!wallet ? 'Connect Wallet' : 'Connected'}
          </Button>
        </div>
      </nav>
      <Swap showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Navbar;
