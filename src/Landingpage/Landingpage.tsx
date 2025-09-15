import { Container, Row, Col, Button } from "react-bootstrap";

LandingPage.route = {
  path: '/',
  menuLabel: 'Home',
  index: 1,
};

export default function LandingPage() {
  return (
    <>
      <Container fluid className="section-full d-flex flex-column justify-content-center align-items-center bg-light">
        <h1 className="mb-3 text-center">Welcome to Booking by Thoernve!</h1>
        <p className="mb-4 text-center lead">
          This is a marketplace for work in IT, whether it is IT-Security or
          Development. Feel free to either browse for freelance agents for hire,
          or sign up in order to find work.
        </p>
        <Button variant="accent" size="lg" href="#enterBanner" className="my-3">
          Get Started
        </Button>
      </Container>

      <Container fluid id="enterBanner" className="section-full">
        <Row className="h-100">
          <Col className="d-flex flex-column flex-md-row">
            <div className="d-flex flex-column justify-content-center align-items-center flex-fill p-5 border bg-surface-accent shadow-sm">
              <h3 className="mb-3">Looking for work</h3>
              <a href="/login" className="btn btn-accent btn-lg mt-3">
                Sign Up
              </a>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center flex-fill p-5 border bg-surface-tinted shadow-sm">
              <h3 className="mb-3">Looking to hire</h3>
              <a href="/login" className="btn btn-accent btn-lg mt-3">
                Browse Freelancers
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
