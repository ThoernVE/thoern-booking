import type Route from './interfaces/Route.ts';
import { createElement } from 'react';

// page components
import LandingPage from './Landingpage/Landingpage.tsx';
import ThemetestPage from './themetest/ThemetestPage.tsx'
import Loginpage from './Loginpage/Loginpage.tsx';
import Registerpage from './Register/Registerpage.tsx';
import Dashboard from './Dashboard/Dashboard.tsx';

export default [
  Dashboard,
  LandingPage,
  ThemetestPage,
  Loginpage,
  Registerpage
]
  // map the route property of each page component to a Route
  .map(x => (({ element: createElement(x), ...x.route }) as Route))
  // sort by index (and if an item has no index, sort as index 0)
  .sort((a, b) => (a.index || 0) - (b.index || 0));