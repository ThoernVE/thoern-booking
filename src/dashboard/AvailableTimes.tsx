import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { EditModal } from "./EditModal";

type AvailableTime = {
    id: number;
    userId: number;
    availableFrom: string;
    availableTo: string;
}


export default function AvailableTimes() {
    const [availableTimes, setAvailableTimes] = useState<AvailableTime[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingTime, setEditingTime] = useState<AvailableTime | null>(null);

    const { user } = useAuth();
    const userId = user?.id;

    useEffect(() => {
        const fetchAvailableTimes = async () => {
            try {
                const response = await fetch(`/api/availableTimes?where=userId=${userId}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch available times");
                }
                const data = await response.json();
                setAvailableTimes(data);
            }
            catch (error) {
                console.error("Error fetching available times:", error);
            }
        }

        fetchAvailableTimes();
    }, []);

    const handleOpenCreate = () => {
        setEditingTime(null);
        setShowModal(true);
    }

    const handleOpenEdit = (time: AvailableTime) => {
        setEditingTime(time);
        setShowModal(true);
    }

    const handleSave = async (from: string, to: string) => {
        if (editingTime) {
            const newTime = { id: editingTime.id, userId: editingTime.userId, availableFrom: from, availableTo: to };
            try {
                const response = await fetch(`/api/availableTimes/${editingTime.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newTime)
                });
                if (!response.ok) {
                    throw new Error("Failed to update available time");
                }

                setAvailableTimes((prev) =>
                    prev.map((t) =>
                        t.id === editingTime.id
                            ? {
                                ...t,
                                availableFrom: from,
                                availableTo: to,
                            }
                            : t
                    )
                );
                setShowModal(false);
            } catch (error) {
                console.error("Error updating available time:", error);
            }
        } else {
            const newTime = { userId: userId, availableFrom: from, availableTo: to };
            try {
                const response = await fetch("/api/availableTimes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newTime)
                });
                if (!response.ok) {
                    throw new Error("Failed to create available time");
                }
                const created = await response.json();
                setAvailableTimes((prev) => [
                    ...prev,
                    {
                        id: created.insertId,
                        userId: user?.id!,
                        availableFrom: from,
                        availableTo: to,
                    },
                ]);
                setShowModal(false);

            } catch (error) {
                console.error("Error creating available time:", error);
            }
        }
    }

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this available time?")) return;

        try {
            const response = await fetch(`/api/availableTimes/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete available time");
            }
            setAvailableTimes((prev) => prev.filter((t) => t.id !== id));

        } catch (error) {
            console.error("Error deleting available time:", error);
        }
    };

    return (

        <div className="container mt-4">
            <h2>Available Times</h2>
            <button className="btn btn-success mb-3" onClick={handleOpenCreate}>
                + Add New Time
            </button>

            <div className="row">
                {availableTimes.map((slot) => (
                    <div className="col-md-6 mb-3" key={slot.id}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Available Time</h5>
                                <p className="card-text">
                                    <strong>From:</strong> {new Date(slot.availableFrom).toLocaleString()} <br />
                                    <strong>To:</strong> {new Date(slot.availableTo).toLocaleString()}
                                </p>
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-accent btn-sm w-50"
                                        onClick={() => handleOpenEdit(slot)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm w-50"
                                        onClick={() => handleDelete(slot.id)}
                                    >
                                        Delete
                                    </button>
                                </div>


                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <EditModal
                    initialFrom={editingTime?.availableFrom ?? ""}
                    initialTo={editingTime?.availableTo ?? ""}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                    isEdit={!!editingTime}
                />
            )}
        </div>
    )
}