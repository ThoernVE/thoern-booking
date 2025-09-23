import type Route from './interfaces/Route.ts';
import { createElement } from 'react';
import ProtectedRoute from "./components/ProtectedRoute.tsx"
import type { ComponentType } from 'react';

// page components
import LandingPage from './landingpage/Landingpage.tsx';
import ThemetestPage from './themetest/ThemetestPage.tsx'
import Loginpage from './loginpage/Loginpage.tsx';
import Registerpage from './register/Registerpage.tsx';
import Dashboard from './dashboard/Dashboard.tsx';
import NotFound from './utils/NotFound.tsx';

export type RoutableComponent = ComponentType & { route?: Route };

const pages: RoutableComponent[] = [
  Dashboard,
  LandingPage,
  ThemetestPage,
  Loginpage,
  Registerpage,
  NotFound,
];

export default pages
  // map the route property of each page component to a Route
  .map((x) => {
    const element =
      x.route?.hiddenWhen || x.route?.roles
        ? createElement(
            ProtectedRoute,
            { roles: x.route?.roles, hiddenWhen: x.route?.hiddenWhen },
            createElement(x)
          )
        : createElement(x);

    return { element, ...x.route } as Route;
  })
  .sort((a, b) => (a.index || 0) - (b.index || 0));
// sort by index (and if an item has no index, sort as index 0)