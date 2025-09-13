import { AppProps } from 'next/app';
import '../styles/globals.css';
import '../styles/index.css';
import '../styles/Navbar.css';
import '../styles/register.css';
import '../styles/profile.css';
import '../styles/footer.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;