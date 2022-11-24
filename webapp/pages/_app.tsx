import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Footer, NavBar } from '../components';
import {
  ConnectionProvider,
  EventProvider,
  IPFSProvider,
  GraphQLProvider,
  TicketTypeProvider,
} from '../Context';
import { TicketProvider } from '../Context/TicketContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <GraphQLProvider>
        <ConnectionProvider>
          <IPFSProvider>
            <EventProvider>
              <TicketTypeProvider>
                <TicketProvider>
                  <NavBar />
                  <Component {...pageProps} />
                  <Footer />
                </TicketProvider>
              </TicketTypeProvider>
            </EventProvider>
          </IPFSProvider>
        </ConnectionProvider>
      </GraphQLProvider>
    </div>
  );
}
