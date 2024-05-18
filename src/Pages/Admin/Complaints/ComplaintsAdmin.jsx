import { useState, useEffect } from "react";
import { LiaClipboard, LiaClipboardListSolid, LiaClipboardCheckSolid } from "react-icons/lia";
import { ComplaintsModal } from "./ComplaintsModal";

export const ComplaintsAdmin = () => {
  const [complaints, setComplaints] = useState([]);
  const [pendingComplaints, setPendingComplaints] = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:5500/complaints", {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setComplaints(data);
      });
  }, []);

  useEffect(() => {
    setPendingComplaints(complaints.filter(complaint => complaint.status === "pending"));
    setResolvedComplaints(complaints.filter(complaint => complaint.status === "resolved"));
  }, [complaints]);

  const handleView = (complaint) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
  };

  const updateComplaintStatus = (id, newStatus) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === id ? { ...complaint, status: newStatus } : complaint
    ));
  };

  return (
    <>
      {!isModalOpen && (
        <div className="p-[10px] space-y-4">
          <h1 className="text-Text font-bold text-xl text-center lg:text-left">Complaints</h1>
          <div className="flex flex-wrap gap-[20px] md:gap-[50px] justify-center lg:justify-start">
            <div className="p-[10px] shadow-md rounded-[5px] flex gap-[20px] w-[180px] h-auto items-center">

              <LiaClipboardListSolid className="w-[50px] h-[50px] fill-Text" />
              <div>
                <h2 className="text-center text-Text font-semibold text-sm md:text-base">Total</h2>
                <p className="text-center">
                  {complaints.length}
                </p>
              </div>
            </div>
            <div className="p-[10px] shadow-md rounded-[5px] flex gap-[20px] w-[180px] h-auto items-center">
              <LiaClipboardCheckSolid className="w-[50px] h-[50px] fill-Green" />
              <div>
                <h2 className="text-center text-Green font-semibold text-sm md:text-base">Resolved</h2>
                <p className="text-center text-Green">
                  {resolvedComplaints.length}
                </p>
              </div>
            </div>
            <div className="p-[10px] shadow-md rounded-[5px] flex gap-[20px] w-[180px] h-auto items-center">
              <LiaClipboard className="w-[50px] h-[50px] fill-Red" />
              <div>
                <h2 className="text-center text-Red font-semibold text-sm md:text-base">Pending</h2>
                <p className="text-center text-Red">
                  {pendingComplaints.length}
                </p>
              </div>
            </div>
          </div>
          <div className="table-responsive">
          <table className="w-full mx-auto text-left">
            <thead className="text-sm md:text-[18px] bg-Variant3  text-Text">
              <tr className="border-[6px] border-white">
                <th className="p-[10px]">Buyer ID</th>
                <th className="p-[10px]">Title</th>
                <th className="p-[10px]">Description</th>
                <th className="p-[10px]">Store ID</th>
                <th className="p-[10px]">Status</th>
                <th className="p-[10px] flex justify-center items-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm md:text-[16px] font-normal text-Variant2">
              {complaints.map((complaint) => {
                const subject = complaint.subject.split(' ').slice(0, 3).join(' ');
                const body = complaint.body.split(' ').slice(0, 3).join(' ');

                return (
                  <tr key={complaint.id} className="bg-white border-[6px] border-white">
                    <td className="p-[10px]">#{complaint.buyer_id}</td>
                    <td className="p-[10px] subject-body">{complaint.subject.split(' ').length > 3 ? subject + '...' : subject}</td>
                    <td className="p-[10px] subject-body">{complaint.body.split(' ').length > 3 ? body + '...' : body}</td>
                    <td className="p-[10px]">#{complaint.store_id}</td>
                    <td className="p-[10px]">{complaint.status}</td>
                    <td className="p-[10px] flex justify-center items-center">
                      <button onClick={() => handleView(complaint)} className="p-[5px] bg-Variant3 text-Text rounded-[5px]">view</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      )}
      {isModalOpen && <ComplaintsModal complaint={selectedComplaint} onClose={() => setIsModalOpen(false)} onUpdate={updateComplaintStatus} />}
    </>
  );
}