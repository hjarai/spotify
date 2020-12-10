/* eslint-disable */
import '../styles/globals.css';
import { Provider } from 'next-auth/client';
import PropTypes from 'prop-types';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

