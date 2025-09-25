import { Row, Col, Container, Form, Button } from "react-bootstrap";

export default function FreelancerWorkFields() {

    const handleWorkFields = {
        //Send the checked in fields to the database to connect freelancer to workfield
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={() => handleWorkFields}>
                        <Form.Group>
                            <Form.Check type="checkbox" label="Frontend" />
                            <Form.Check type="checkbox" label="Backend" />
                            <Form.Check type="checkbox" label="Security" />
                            <Form.Check type="checkbox" label="Devops" />
                        </Form.Group>
                        <Button variant="accent" type="submit">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )

}