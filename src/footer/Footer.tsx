import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return <footer>
    <Container fluid>
      <Row>
        <Col className="text-center py-3 text-bg-primary">
          © <span className="fw-bold">Booking</span><span className="fs-6 text-sm"> by thoernve</span> {new Date().getFullYear()}
        </Col>
      </Row>
    </Container>
  </footer>;
}