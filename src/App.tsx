import { useLocation } from 'react-router-dom';
import Header from "./header/Header";
import Main from './main/Main';
import Footer from './footer/Footer';
import AuthProvider from "./context/AuthProvider";


export default function App() {

  useLocation();
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  return <>
    <AuthProvider>
      <Header />
      <Main />
      <Footer />
    </AuthProvider>
  </>;
};