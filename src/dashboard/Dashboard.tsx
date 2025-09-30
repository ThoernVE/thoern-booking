import { Row, Col, Container, Alert } from 'react-bootstrap';

import { useAuth } from '../hooks/useAuth';
import type User from '../interfaces/User';
import type Route from '../interfaces/Route';
import MyBookings from './MyBookings';
import FreelancerWorkFields from './FreelancerWorkfields';
import FindFreelancer from './FindFreelancer';
import AvailableTimes from './AvailableTimes';
import { useEffect, useState } from 'react';

Dashboard.route = {
    path: '/dashboard',
    menuLabel: 'Dashboard',
    index: 3,
    hiddenWhen: "loggedOut",
    roles: ["freelancer", "user", "admin"] as User["role"][],
} as Route;



export default function Dashboard() {
    const { user, loading } = useAuth();
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (saved) {
            const timer = setTimeout(() => setSaved(false), 3000)
            return () => clearTimeout(timer);
        }
    });


    if (loading) {
        return (
            <div>loading...</div>
        )
    }



    return <>
        {saved && (
            <Alert
                variant="success"
                style={{
                    position: "fixed",
                    top: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1050,
                    width: "auto",
                    minWidth: "300px",
                    textAlign: "center"
                }}
            >
                Workfields saved!
            </Alert>
        )}
        <Container>
            <Row>
                <Col className="pt-5 d-flex flex-column justify-content-center align-items-center justify-content-center align-items-center">
                    <MyBookings />
                </Col>
            </Row>
            <Row>
                <Col className="d-flex flex-column justify-content-center align-items-center">
                    <h2 className="text-primary">About me</h2>
                    <p>Hello! I am Viktor. Read more at <a href="https://thoernve.dev">my webpage</a></p>
                </Col>
            </Row>
        </Container>

        {user?.role === 'freelancer'
            ? <Container>
                <Row className="min-vh-100 shadow rounded-3 border">
                    <Col md={8} sm={6} className="h-xs-100  ">
                        <AvailableTimes />
                    </Col>
                    <Col md={4} sm={6} className="h-xs-100 d-flex justify-content-center align-items-center  ">
                        <FreelancerWorkFields onSaved={() => setSaved(true)} />
                    </Col>
                </Row>
            </Container>
            :
            <Container>
                <Row>
                    <Col>
                        <FindFreelancer />
                    </Col>
                </Row>
            </Container>
        }
    </>;
}