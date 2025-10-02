import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export default function NotFound() {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRedirect(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container fluid className="section-full d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col className="text-center">
          <h1 className="fw-bold text-danger mb-3">404 - Page Not Found</h1>
          <p className="mb-0">Redirecting you back to the homepage…</p>
        </Col>
      </Row>
    </Container>
  );
}

NotFound.route = {
  path: "*",
  index: 9999,
};
