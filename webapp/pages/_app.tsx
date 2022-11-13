import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Footer, NavBar } from "../components";
import { ConnectionProvider, EventProvider } from "../Context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ConnectionProvider>
        <EventProvider>
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </EventProvider>
      </ConnectionProvider>
    </div>
  );
}
