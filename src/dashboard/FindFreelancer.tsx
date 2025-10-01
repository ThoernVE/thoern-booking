import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface Availability {
    userId: number;
    freelancerName: string;
    availableTimeId: number;
    availableFrom: string;
    availableTo: string;
    workfield: string[];
}

type Props = {
    onBooked: () => void;
};

export default function FindFreelancer({ onBooked }: Props) {
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const [search, setSearch] = useState("");
    const [selectedWorkfield, setSelectedWorkfield] = useState("All");

    useEffect(() => {
        fetch("/api/freelancerAvailability")
            .then(res => res.json())
            .then(data => {
                const normalizedData = data.map((slot: any) => ({
                    ...slot,
                    workfield: slot.workfield
                        ? slot.workfield.split(",").map((w: string) => w.trim())
                        : []
                }));
                setAvailabilities(normalizedData);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching freelancer availabilities:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    const workfields = ["All", ...Array.from(new Set(availabilities.flatMap(a => a.workfield)))];

    const filteredAvailabilities = availabilities.filter((slot) => {
        const matchesSearch = slot.freelancerName.toLowerCase().includes(search.toLowerCase());
        const matchesWorkfield = selectedWorkfield === "All" || slot.workfield.includes(selectedWorkfield);
        return matchesSearch && matchesWorkfield;
    });


    const handleBooking = async (slot: Availability) => {
        if (!user) {
            alert("You must be logged in to book a freelancer.")
            return;
        }

        const payload = {
            UserId: user.id,
            AvailableTimeId: slot.availableTimeId
        }

        try {
            const response = await fetch("/api/bookTime", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error("Booking failed");

            onBooked();

            setAvailabilities(prev => prev.filter(a => a.availableTimeId !== slot.availableTimeId));

            window.dispatchEvent(new Event("bookingChanged"));
        } catch (err) {
            console.error("Error booking time:", err);
            alert("Error booking time. Please try again.");
        }
    }

    return (
        <div className="container mt-4">
            <h2>Find Available Freelancers:</h2>

            <div className="row mb-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by freelancer name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <select
                        className="form-select"
                        value={selectedWorkfield}
                        onChange={(e) => setSelectedWorkfield(e.target.value)}
                    >
                        {workfields.map((wf) => (
                            <option key={wf} value={wf}>
                                {wf}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="container mt-4">
                <h2>Available Times</h2>
                <div className="row">
                    {filteredAvailabilities.length === 0 ? (
                        <div className="col-12">
                            <h4 className="py-5 text-custom-muted text-center">
                                No available times at this moment.
                            </h4>
                        </div>
                    ) : (
                        filteredAvailabilities.map((slot) => (
                            <div
                                className="col-md-4 mb-3"
                                key={slot.availableTimeId + "-" + slot.workfield}
                            >
                                <div className="card shadow-sm h-100">
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{slot.freelancerName}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">
                                            {slot.workfield.join(", ")}
                                        </h6>
                                        <p className="card-text">
                                            <strong>From:</strong>{" "}
                                            {new Date(slot.availableFrom).toLocaleString()} <br />
                                            <strong>To:</strong>{" "}
                                            {new Date(slot.availableTo).toLocaleString()}
                                        </p>
                                        <button
                                            className="btn btn-accent btn-sm mt-auto"
                                            onClick={() => handleBooking(slot)}
                                        >
                                            Book
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}