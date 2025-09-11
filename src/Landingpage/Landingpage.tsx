import { Row, Col } from "react-bootstrap";
import { ThemeTest } from "../Themetest";

LandingPage.route = {
  path: '/',
  menuLabel: 'Home',
  index: 1,
};

export default function LandingPage() {
    return <>
        <Row>
          <Col>
            <h1 className="text-center">Page is under construction</h1>
            <h3>Feel free to check out <a href="https://thoernve.dev">the main page</a> while waiting!</h3>
          </Col>
        </Row>
      </>;
    }
