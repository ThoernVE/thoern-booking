import { Form, Button } from "react-bootstrap";

export default function FreelancerWorkFields() {

    const handleWorkFields = {
        //Send the checked in fields to the database to connect freelancer to workfield
    }

    return (
                <div>
                    <Form onSubmit={() => handleWorkFields}>
                        <Form.Group>
                            <Form.Check
                                type="checkbox"
                                id="frontend"
                                label="Frontend"
                                className="big-check"
                            />
                            <Form.Check
                                type="checkbox"
                                id="backend"
                                label="Backend"
                                className="big-check"
                            />
                            <Form.Check
                                type="checkbox"
                                id="security"
                                label="Security"
                                className="big-check"
                            />
                            <Form.Check
                                type="checkbox"
                                id="devops"
                                label="DevOps"
                                className="big-check"
                            />
                        </Form.Group>
                        <Button variant="accent" type="submit">Submit</Button>
                    </Form>
                </div>
    )

}