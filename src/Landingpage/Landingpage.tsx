import { Row, Col } from "react-bootstrap";
import { ThemeTest } from "../Themetest";

LandingPage.route = {
  path: '/',
  menuLabel: 'Home',
  index: 1,
  parent: '/',
};

export default function LandingPage() {
    return <>
        <Row>
          <Col>
            <ThemeTest/>
          </Col>
        </Row>
      </>;
    }
