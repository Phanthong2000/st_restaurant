import ScrollToTop from './components/ScrollToTop';
import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import UtilRedux from './util/UtilRedux';

export default function App() {
  return (
    <ThemeConfig>
      <UtilRedux />
      <ScrollToTop />
      <GlobalStyles />
      <Router />
    </ThemeConfig>
  );
}
