import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Footer, NavBar } from '../components';
import {
  ConnectionProvider,
  EventProvider,
  IPFSProvider,
  GraphQLProvider,
} from '../Context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <GraphQLProvider>
        <ConnectionProvider>
          <IPFSProvider>
            <EventProvider>
              <NavBar />
              <Component {...pageProps} />
              <Footer />
            </EventProvider>
          </IPFSProvider>
        </ConnectionProvider>
      </GraphQLProvider>
    </div>
  );
}
