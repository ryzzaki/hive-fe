import type { AppProps } from 'next/app';
import { WalletProvider } from '../utils/context/WalletContext';
import MainContainer from '../components/containers/mainContainer';
import '../assets/styles/main.css';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WalletProvider>
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
    </WalletProvider>
  );
};

export default App;
