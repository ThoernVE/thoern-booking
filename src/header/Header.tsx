import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import routes from '../routes';
import { useAuth } from "../context/AuthProvider";

export default function Header() {
  const { user } = useAuth();

  // whether the navbar is expanded or not
  // (we use this to close it after a click/selection)
  const [expanded, setExpanded] = useState(false);

  //  get the current route
  const pathName = useLocation().pathname;
  const currentRoute = routes
    .slice().sort((a, b) => a.path.length > b.path.length ? -1 : 1)
    .find(x => pathName.indexOf(x.path.split(':')[0]) === 0);
  // function that returns true if a menu item is 'active'
  const isActive = (path: string) =>
    path === currentRoute?.path || path === currentRoute?.parent;

  const visibleRoutes = routes.filter((r) => {
    if (!r.menuLabel) return false;

    if (r.hiddenWhen === "loggedIn" && user) return false;
    if (r.hiddenWhen === "loggedOut" && !user) return false;

    if (r.roles && user && user.role !== "admin" && !r.roles.includes(user.role)) return false;

    return true;
  })

  return <header>
    <Navbar
      expanded={expanded}
      expand="md"
      className="bg-white"
      data-bs-theme="dark"
      fixed="top"
    >
      <Container fluid>
        <Navbar.Brand className="me-5 text-primary" as={Link} to="/">
          <span className="fw-bold">Booking</span><span className="fs-6 text-sm"> by thoernve</span>
        </Navbar.Brand>
        <Navbar.Toggle onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {visibleRoutes.filter(x => x.menuLabel).map(
              ({ menuLabel, path }, i) =>
                <Nav.Link
                  as={Link} key={i} to={path}
                  className={`text-custom-muted bg-white ${isActive(path) ? "active text-accent" : ""}`}
                  /* close menu after selection*/
                  onClick={() => setTimeout(() => setExpanded(false), 200)}
                >{menuLabel}</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>;
}