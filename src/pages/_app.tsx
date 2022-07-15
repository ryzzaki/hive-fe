import type { AppProps } from 'next/app';
import MainContainer from '../components/containers/mainContainer';
import '../assets/styles/main.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MainContainer>
      <Component {...pageProps} />
    </MainContainer>
  );
};

export default App;
