import { useState } from "react";

export const ComplaintModal = ({ isOpen, onRequestClose, storeId, buyerId }) => {
    const [complaintData, setComplaintData] = useState({ subject: '', body: '' });

    const handleComplaintSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const response = await fetch('https://my-banda.onrender.com/complaints', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...complaintData, store_id: storeId, buyer_id: buyerId })
        });
        const data = await response.json();
        console.log(data);
        onRequestClose();
    }

    return isOpen ? (
        <>
            <div className="fixed inset-0 z-10 bg-black opacity-70 backdrop-blur-md"></div>
            <div className="fixed z-20 inset-0 flex justify-center mt-10 items-start p-5">
                <div className="bg-white rounded-[5px] text-left overflow-hidden shadow-md w-full md:w-full lg:w-1/2 m-auto">
                    <div className="p-3 md:p-6 space-y-5">
                        <h1 className="text-base md:text-xl font-semibold text-center text-Text">
                            File a Complaint
                        </h1>
                        <form onSubmit={handleComplaintSubmit} className="flex flex-col gap-[15px]">
                            <label className="text-base sm:text-lg font-medium text-Text">
                                Title:
                                <input type="text" value={complaintData.subject} onChange={(e) => setComplaintData({ ...complaintData, subject: e.target.value })} required className="mt-1 block w-full py-2 px-3 border border-gray-200 bg-white rounded-[5px] focus:outline-none text-sm sm:text-base text-Text font-light" />
                            </label>
                            <label className="text-base sm:text-lg font-medium text-Text">
                                Description:
                                <textarea value={complaintData.body} onChange={(e) => setComplaintData({ ...complaintData, body: e.target.value })} required className="mt-1 block w-full h-[100px] py-2 px-3 border border-gray-200 bg-white rounded-[5px] focus:outline-none text-sm sm:text-base text-Text font-light" />
                            </label>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button type="submit" className="w-full sm:w-auto justify-center rounded-[5px] px-4 py-2 bg-Secondary text-base font-normal text-white">
                                    Submit
                                </button>
                                <button onClick={onRequestClose} type="button" className="w-full sm:w-auto justify-center rounded-md border border-gray-200 px-4 py-2 bg-white text-base font-normal text-Text">
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    ) : null;
};