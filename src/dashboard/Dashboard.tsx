import { Row, Col, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
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
    const { user, loading, logout } = useAuth();
    const navigator = useNavigate();

    if (loading) {
        return (
            <div>loading...</div>
        )
    }


    async function handleLogout() {
        try {
            await logout();
            console.log("User succesfully logged out");
            navigator("/");
        }
        catch (err) {
            console.error(err);
            navigator("/");
        }
    }
    return <>
        <Container>
            <Row>
                <Col className="pt-5 d-flex flex-column justify-content-center align-items-center justify-content-center align-items-center">
                    <MyBookings />
                </Col>
            </Row>
            <Row>
                <Col className="section-full d-flex flex-column justify-content-center align-items-center">
                    <h2 className="text-primary">About me</h2>
                    <p>Hello! I am Viktor. Read more at <a href="https://thoernve.dev">my webpage</a></p>
                    <Button onClick={handleLogout}>Logout</Button>
                </Col>
            </Row>
        </Container>

        {user?.role === 'freelancer'
            ? <Container>
                <Row>
                    <Col lg={6}>
                        <FreelancerWorkFields />
                    </Col>
                    <Col lg={6}>
                        <AvailableTimes />
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