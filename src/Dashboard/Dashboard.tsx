import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

Dashboard.route = {
    path: '/dashboard',
    menuLabel: 'Dashboard',
    index: 3
};



export default function Dashboard() {
    const navigator = useNavigate();

    async function logout() {
        try {
            const response = await fetch("/api/login", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                console.error(response.status)
                throw new Error("Logout failed");
            }
            console.log("User succesfully logged out");
            navigator("/");
        }
        catch (err) {
            console.error(err);
            navigator("/");
        }
    }
    return <>
        <Row>
            <Col>
                <h2 className="text-primary">About me</h2>
                <p>Hello! I am Viktor. Read more at <a href="https://thoernve.dev">my webpage</a></p>
                <Button onClick={logout}>Logout</Button>
            </Col>
        </Row>
    </>;
}