import { useEffect, useState } from "react";

interface Availability {
    userId: number;
    freelancerName: string;
    availableTimeId: number;
    availableFrom: string;
    availableTo: string;
    workfield: string[];
}

export default function FindFreelancer() {
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);
    const [loading, setLoading] = useState(true);

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


    return (
        <div className="container mt-4">
            <h2>Freelancer Availability</h2>

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
                    {filteredAvailabilities.map((slot) => (
                        <div className="col-md-4 mb-3" key={slot.availableTimeId + "-" + slot.workfield}>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{slot.freelancerName}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{slot.workfield.join(", ")}</h6>
                                    <p className="card-text">
                                        <strong>From:</strong>{" "}
                                        {new Date(slot.availableFrom).toLocaleString()} <br />
                                        <strong>To:</strong> {new Date(slot.availableTo).toLocaleString()}
                                    </p>
                                    <button className="btn btn-primary btn-sm">Book</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}