import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Row, Col, Container } from "react-bootstrap";


Loginpage.route = {
    path: '/login',
    menuLabel: 'Login',
    index: 2
};

export default function Loginpage() {
    return (
        <>
            <Container>
                <Row>
                    <Col className="section-full d-flex flex-column justify-content-center align-items-center p-5 border bg-surface-accent shadow-sm">
                        <h1 className="mb-5 fw-bold">Log In</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="accent" type="submit">
                                Submit
                            </Button>
                        </Form>
                        <p className="mt-5">Are you new here? <a href="/register">Sign up</a></p>
                    </Col >
                </Row >
            </Container>
        </>
    );
}