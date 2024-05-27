import { useState } from "react";

export const ComplaintsModal = ({ complaint, onClose, onUpdate }) => {
    const [status, setStatus] = useState(complaint.status);

    const handleSubmit = (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token");

        fetch(`https://my-banda.onrender.com/complaint/${complaint.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        })
            .then(() => {
                onUpdate(complaint.id, status);
                onClose();
            });
    };

    return (
        <div className="fixed z-10 inset-0 flex justify-center mt-10 items-start p-5">
            <div className="bg-white rounded-[5px] text-left overflow-hidden shadow-md w-3/4 sm:w-1/2 m-auto">
                <div className="p-6 space-y-5">
                    <h1 className="text-base md:text-lg font-semibold text-center text-Text">
                        {complaint.subject}
                    </h1>
                    <div>
                        <h2 className="text-base md:text-lg font-semibold text-Text">Description:</h2>
                        <p className="text-Variant2 text-sm md:text-base font-normal">
                            {complaint.body}
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]">
                        <label className="text-base md:text-lg font-semibold text-Text">
                            Status:
                            <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 block w-auto md:w-1/2 py-2 px-3 border border-Variant3 bg-white rounded-[5px] focus:outline-none text-sm text-Text font-light">
                                <option value="resolved">Approve</option>
                                <option value="rejected">Reject</option>
                            </select>
                        </label>
                        <div className="flex flex-col md:flex-row gap-3">
                            <button type="submit" className="w-auto md:w-1/4 justify-center rounded-[5px] px-4 py-2 bg-Secondary text-base font-medium text-white sm:text-sm">
                                Update
                            </button>
                            <button onClick={onClose} type="button" className="w-auto md:w-1/4 justify-center rounded-md border border-Variant3 px-4 py-2 bg-white text-base font-medium text-Text sm:text-sm">
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};