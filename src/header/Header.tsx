import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import routes from '../routes';
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();
  const navigator = useNavigate();

  const [expanded, setExpanded] = useState(false);

  async function handleLogout() {
        try {
            await logout();
            console.log("User succesfully logged out");
            navigator("/");
        }
        catch (err) {
            console.error(err);
            navigator("/");
        }
    }

  const pathName = useLocation().pathname;
  const currentRoute = routes
    .slice().sort((a, b) => a.path.length > b.path.length ? -1 : 1)
    .find(x => pathName.indexOf(x.path.split(':')[0]) === 0);
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
                  onClick={() => setTimeout(() => setExpanded(false), 200)}
                >{menuLabel}</Nav.Link>
            )}
          </Nav>
          {user  
            ?<Nav>
              <Nav.Link
              onClick={handleLogout} className='text-accent fw-bold'>Log Out</Nav.Link>
            </Nav>
            : <Nav>
              <Nav.Link
              href="login" className='text-accent fw-bold'>Log In</Nav.Link>
            </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>;
}