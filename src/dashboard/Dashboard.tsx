import { Row, Col, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import type User from '../interfaces/User';
import type Route from '../interfaces/Route';
import MyBookings from './MyBookings';

Dashboard.route = {
    path: '/dashboard',
    menuLabel: 'Dashboard',
    index: 3,
    hiddenWhen: "loggedOut",
    roles: ["freelancer", "user", "admin"] as User["role"][],
} as Route;



export default function Dashboard() {
    const { logout } = useAuth();
    const navigator = useNavigate();

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
    </>;
}