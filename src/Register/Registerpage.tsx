import { Row, Col, Form, Button, Container } from 'react-bootstrap';

Registerpage.route = {
    path: '/register',
    index: 3
}

export default function Registerpage() {
    return (
        <>
            <Container>
                <Row>
                    <Col className="section-full d-flex flex-column justify-content-center align-items-center p-5 border bg-surface-accent shadow-sm">
                        <h1 className="mb-5 fw-bold">Create Account</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Role">
                                <Form.Label>User Type</Form.Label>
                                <Form.Select>
                                    <option value="freelancer">Freelancer</option>
                                    <option value="customer">Customer</option>
                                </Form.Select>
                            </Form.Group>
                            <Button variant="accent" type="submit">
                                Register
                            </Button>
                        </Form>
                        <p className="mt-5">Already a user? <a href="/login">Log in</a></p>
                    </Col >
                </Row >
            </Container>
        </>
    );
}