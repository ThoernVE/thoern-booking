import { Card } from "react-bootstrap";

interface BookingInfo {
    bookingId: number;
    freelancer: string;
    customer: string;
    from: string;
    to: string;
    subject: string;
}

export default function BookingCard() {
    return (
        <>
            <Card />
        </>
    );
}