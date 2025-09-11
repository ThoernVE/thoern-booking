import { Row, Col } from "react-bootstrap";
import { ThemeTest } from "../Themetest";

LandingPage.route = {
  path: '/Themetest',
  menuLabel: 'Themetest',
  index: 2,
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
