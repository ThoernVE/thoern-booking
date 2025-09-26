import { Form, Button, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

type Workfield = {
    id: number;
    workfield: string;
}


export default function FreelancerWorkFields() {
    const [workfields, setWorkfields] = useState<Workfield[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<number[]>([]);
    const { user } = useAuth();
    const userId = user?.id;

    useEffect(() => {
        const fetchWorkfields = async () => {
            try {

                const [wfResult, userResult] = await Promise.all([
                    fetch("api/workfields"),
                    fetch("api/users/workfields", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(userId)
                    })
                ]);

                if (!wfResult.ok || !userResult.ok) throw new Error("Failed to fetch");

                const wfData: Workfield[] = await wfResult.json();
                const userData: number[] = await userResult.json();

                setWorkfields(wfData);
                setSelected(userData);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkfields();
    }, [userId]);

    const handleChange = (id: number) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    }

    const handleSubmit = async () => {
        const payload = {
            userId: user?.id,
            workfieldsIds: selected
        };

        await fetch("api/users/workfields", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })

        console.log("Saved", payload)
    }

    if (loading) return <Spinner animation="border" />;

    return (
        <div>
            <Form onSubmit={() => handleSubmit}>
                <Form.Group>
                    {workfields.map(wf => (
                        <Form.Check
                            key={wf.id}
                            type="checkbox"
                            label={wf.workfield}
                            checked={selected.includes(wf.id)}
                            onChange={() => handleChange(wf.id)}
                            className="big-check"
                        />
                    ))}
                </Form.Group>
                <Button variant="accent" type="submit">Save</Button>
            </Form>
        </div>
    )

}