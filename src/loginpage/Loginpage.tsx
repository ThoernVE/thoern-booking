import { Button, Form, Alert, Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";


Loginpage.route = {
    path: '/login',
    menuLabel: 'Login',
    index: 2,
    hiddenWhen: "loggedIn",
};

export default function Loginpage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as { from?: Location })?.from?.pathname || "/dashboard";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await login(email, password);
            navigate(from, { replace: true });
        }
        catch (err) {
            setError("Login failed. Please check your credentails.")
            console.error(err);
        }
    }
    return (
        <>
            <Container>
                <Row>
                    <Col className="section-full d-flex flex-column justify-content-center align-items-center p-5 border bg-surface-accent shadow-sm">
                        {error && (
                            <Alert
                                variant="danger"
                                onClose={() => setError(null)}
                                dismissible
                                className="w-100"
                            >
                                {error}
                            </Alert>
                        )}
                        <h1 className="mb-5 fw-bold">Log In</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (error) setError(null);
                                }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (error) setError(null)
                                }} />
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