import { Row, Col } from 'react-bootstrap';

AboutPage.route = {
  path: '/about-us',
  menuLabel: 'About us',
  index: 2
};

export default function AboutPage() {
  return <>
    <Row>
      <Col>
        <h2 className="text-primary">About me</h2>
        <p>Hello! I am Viktor. Read more at <a href="https://thoernve.dev">my webpage</a></p>
      </Col>
    </Row>
  </>;
}