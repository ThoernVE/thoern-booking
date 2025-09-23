import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type Route from '../interfaces/Route';

Registerpage.route = {
    path: '/register',
    index: 3,
    hiddenWhen: "loggedIn",
}as Route;

export default function Registerpage() {
    const navigator = useNavigate();

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, firstName, lastName, password, role }),
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            const data = await response.json();
            console.log("Usercreation successful:", data);

            navigator("/login");
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
                        <h1 className="mb-5 fw-bold">Create Account</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Role">
                                <Form.Label>User Type</Form.Label>
                                <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
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