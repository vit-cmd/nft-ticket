import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {Footer, NavBar} from '../components';
import {IPFSProvider, ConnectionProvider, EventProvider} from '../Context';

export default function App({Component, pageProps}: AppProps) {
  return (
    <div>
      <EventProvider>
        <ConnectionProvider>
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </ConnectionProvider>
      </EventProvider>
    </div>
  );
}
