import { AppProps } from 'next/app';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.css';
import '../styles/Navbar.css';
import '../styles/register.css';
import '../styles/profile.css';
import '../styles/footer.css';
import '../styles/pagination.css';
import '../styles/nav.css';
import '../styles/activities.css';
import '../styles/card.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;