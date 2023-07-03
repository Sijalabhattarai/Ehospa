import '../public/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Navbar from "../components/Navbar";
import Nav from '../components/Navbar/Nav';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            {/* <Navbar /> */}
            <Nav />
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default MyApp