import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

type BookingInfo = {
    id: number;
    customerName: string;
    freelancerName: string;
    bookedFrom: string;
    bookedTo: string;
};

export default function BookingList() {
    const { user } = useAuth();
    const userId = user?.id;
    const role = user?.role;

    const [bookings, setBookings] = useState<BookingInfo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId || !role) return;

        const fetchBookings = async () => {
            try {
                let where = "";

                if (role === "user") {
                    where = `customerId=${userId}`;
                } else if (role === "freelancer") {
                    where = `freelancerId=${userId}`;
                } // admins see all bookings

                const url = where
                    ? `/api/bookingInformation?where=${where}&orderby=bookedFrom`
                    : `/api/bookingInformation?orderby=bookedFrom`;

                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to fetch bookings");

                const data: BookingInfo[] = await response.json();
                setBookings(data);
            } catch (err) {
                console.error("Error fetching bookings:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();

        const handler = () => fetchBookings();
        window.addEventListener("bookingChanged", handler);
        return () => window.removeEventListener("bookingChanged", handler);
    }, [userId, role]);

    if (loading) return <p>Loading bookings...</p>;

    return (
        <div className="container my-4 ">
            <h2>Bookings</h2>
            <div className="d-none d-md-block">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Freelancer</th>
                            <th>From</th>
                            <th>To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length > 0 ? (
                            bookings.map((b) => (
                                <tr key={`table-${b.id}`}>
                                    <td>{b.customerName}</td>
                                    <td>{b.freelancerName}</td>
                                    <td>{new Date(b.bookedFrom).toLocaleString()}</td>
                                    <td>{new Date(b.bookedTo).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    No bookings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="d-md-none">
                {bookings.length > 0 ? (
                    bookings.map((b) => (
                        <div className="card mb-3 shadow-sm" key={`card-${b.id}`}>
                            <div className="card-body">
                                <h6 className="card-subtitle mb-2 text-muted">
                                    {b.customerName} → {b.freelancerName}
                                </h6>
                                <p className="card-text">
                                    <strong>From:</strong> {new Date(b.bookedFrom).toLocaleString()} <br />
                                    <strong>To:</strong> {new Date(b.bookedTo).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
        </div>
    );
}
