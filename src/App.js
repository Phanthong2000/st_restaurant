import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ScrollToTop from './components/ScrollToTop';
import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import UtilRedux from './util/UtilRedux';
import { connectWithSocket } from './util/wssConnection';

export default function App() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  useEffect(() => {
    connectWithSocket();
    return function () {
      return null;
    };
  }, []);
  return (
    <ThemeConfig>
      <UtilRedux />
      <ScrollToTop />
      <GlobalStyles />
      <Router />
    </ThemeConfig>
  );
}
