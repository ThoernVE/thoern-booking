import { useState } from "react";

type EditModalProps = {
    initialFrom: string;
    initialTo: string;
    onClose: () => void;
    onSave: (from: string, to: string) => void;
    isEdit: boolean;
}


function getNowForDatetimeLocal() {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const yyyy = now.getFullYear();
    const mm = pad(now.getMonth() + 1);
    const dd = pad(now.getDate());
    const hh = pad(now.getHours());
    const min = pad(now.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

export function EditModal({ initialFrom, initialTo, onClose, onSave, isEdit }: EditModalProps) {
    const [from, setFrom] = useState(
        isEdit ? initialFrom : getNowForDatetimeLocal()
    );
    const [to, setTo] = useState(
        isEdit ? initialTo : getNowForDatetimeLocal()
    );

    return (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog">
                <div className="modal-content shadow">
                    <div className="modal-header">
                        <h5 className="modal-title">{isEdit ? "Edit Available Time" : "Add Available Time"}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <label className="form-label">From</label>
                        <input
                            type="datetime-local"
                            className="form-control mb-3"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        />
                        <label className="form-label">To</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="btn btn-success" onClick={() => onSave(from, to)}>
                            {isEdit ? "Save Changes" : "Create"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}