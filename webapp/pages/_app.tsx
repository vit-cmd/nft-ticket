import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Footer, NavBar } from "../components";
import { TicketNFTMarketplaceProvider } from "../Context/TicketNFTContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <TicketNFTMarketplaceProvider>
        <NavBar />
        <Component {...pageProps} />  
        <Footer />
      </TicketNFTMarketplaceProvider>
    </div>
    )
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
