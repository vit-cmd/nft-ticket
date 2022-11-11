import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Footer, NavBar } from "../components";
import { TicketNFTProvider } from "../Context/TicketNFTContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <TicketNFTProvider>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </TicketNFTProvider>
    </div>
  );
}

// const MyApp = ({ Component, pageProps }) => (
//   <div>
//     <NFTMarketplaceProvider>
//       <NavBar />
//       <Component {...pageProps} />
//       <Footer />
//     </NFTMarketplaceProvider>
//   </div>
// );

// export default MyApp;
