import "../styles/globals.css";
import AdminProvider from "/context/AdminContext";
import { SessionProvider } from "next-auth/react";
import "@fortawesome/fontawesome-free/css/all.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
