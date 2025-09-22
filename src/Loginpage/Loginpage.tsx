import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


Loginpage.route = {
    path: '/login',
    menuLabel: 'Login',
    index: 2
};

export default function Loginpage() {
    const navigator = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();
            console.log("Login successful:", data);

            //logic for being logged in
            navigator("/dashboard");
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <>
            <Container>
                <Row>
                    <Col className="section-full d-flex flex-column justify-content-center align-items-center p-5 border bg-surface-accent shadow-sm">
                        <h1 className="mb-5 fw-bold">Log In</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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