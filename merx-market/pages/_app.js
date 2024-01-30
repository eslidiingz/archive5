// import 'bootstrap/dist/css/bootstrap.min.css'
import Head from "next/head";
import "../public/assets/font-awesome/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../public/assets/css/custom.css";
import "../public/assets/css/style.css";
import "../public/assets/css/custom-meiji.css";
import "../public/assets/css/custom-rsu-meiji.css";
import "../public/assets/css/custom-rsu-gia.css";
import "../public/assets/css/custom-rsu-phorn.css";
import Playmusic from "../components/layouts/Playmusic";
import { SSRProvider } from "react-bootstrap";

import WalletProvider from "/context/wallet";
import MetamaskProvider from "/components/MetamaskProvider";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  const getLibrary = (provider) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 12000;

    return library;
  };

  return (
    <>
      <Head>
        {/* <link rel="icon" type="image/png" href="../favicon-32.png" sizes="32x32"></link> */}
        <link
          rel="icon"
          type="image/png"
          href="../icon-passionworld.png"
        ></link>
        <meta
          name="description"
          content="We've got a great list of investors including HTC, Palmdrive Capital, Cherubic Ventures from the traditional side, Mechanism, Jump Trading, and NGC from crypto. Our most recent investment round is led by a combination of top tier brands and exchanges, allowing us to build interoperability between games natively in our metaverse."
        />
        <meta name="keywords" content="NFT Marketplace" />
        <meta property="og:title" content="NFT Marketplace" />
        <meta property="og:type" content="NFT Marketplace" />
        <title>NFT Marketplace</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
          rel="stylesheet"
        ></link>

        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* font Rubik */}
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SSRProvider>
        <WalletProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <MetamaskProvider>
              <Layout>
                <Component {...pageProps} />
                <Playmusic />
              </Layout>
            </MetamaskProvider>
          </Web3ReactProvider>
        </WalletProvider>
      </SSRProvider>
    </>
  );
}

export default MyApp;
