/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, ReactNode, useEffect, useState } from 'react';

interface IContext {
  wallet: string | null;
}

const seedContext: IContext = {
  wallet: null,
};

const getOrSeedContext = () => {
  const existingState = localStorage.getItem('wallet_context');
  if (existingState) {
    return JSON.parse(existingState);
  }
  return seedContext;
};

const WalletContext = createContext({
  ...seedContext,
  setWallet: (_wallet: string) => {},
});

type WalletProviderProps = {
  children: ReactNode;
};

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<string | null>(null);

  useEffect(() => {
    setWallet(getOrSeedContext().wallet);
  }, []);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        setWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
