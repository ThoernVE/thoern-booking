import { useLocation } from 'react-router-dom';
import Header from "./header/Header";
import Main from './main/Main';
import Footer from './footer/Footer';
import BootstrapBreakpoints from './parts/BootstrapBreakpoints';
import AuthProvider from "./context/AuthProvider";

// turn off when not needed for debugging
const showBootstrapBreakpoints = true;

export default function App() {

  // scroll to top when the route changes
  useLocation();
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  return <>
    <AuthProvider>
      <Header />
      <Main />
      <Footer />
      {showBootstrapBreakpoints ? <BootstrapBreakpoints /> : null}
    </AuthProvider>
  </>;
};