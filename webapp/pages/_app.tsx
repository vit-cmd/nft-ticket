import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {Footer, NavBar} from '../components';
import {ConnectionProvider, EventProvider, IPFSProvider} from '../Context';

export default function App({Component, pageProps}: AppProps) {
  return (
    <div>
      <ConnectionProvider>
        <IPFSProvider>
          <EventProvider>
            <NavBar />
            <Component {...pageProps} />
            <Footer />
          </EventProvider>
        </IPFSProvider>
      </ConnectionProvider>
    </div>
  );
}
