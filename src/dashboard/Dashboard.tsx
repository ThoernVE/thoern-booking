import { Row, Col, Container } from 'react-bootstrap';

import { useAuth } from '../hooks/useAuth';
import type User from '../interfaces/User';
import type Route from '../interfaces/Route';
import MyBookings from './MyBookings';
import FreelancerWorkFields from './FreelancerWorkfields';
import FindFreelancer from './FindFreelancer';
import AvailableTimes from './AvailableTimes';

Dashboard.route = {
    path: '/dashboard',
    menuLabel: 'Dashboard',
    index: 3,
    hiddenWhen: "loggedOut",
    roles: ["freelancer", "user", "admin"] as User["role"][],
} as Route;



export default function Dashboard() {
    const { user, loading } = useAuth();


    if (loading) {
        return (
            <div>loading...</div>
        )
    }


 
    return <>
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
                <Row className="min-vh-100">
                    <Col xxl={10} lg={9} md={8} sm={6} className="h-xs-100">
                        <AvailableTimes />
                    </Col>
                    <Col xxl={2} lg={3} md={4} sm={6} className="h-xs-100 d-flex justify-content-center align-items-center">
                        <FreelancerWorkFields />
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