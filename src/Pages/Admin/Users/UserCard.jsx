import avatar from "../../../assets/avatar.jpeg";

export const UserCard = ({ user, onDelete }) => {
  function handleDelete() {
    const token = localStorage.getItem('token')

    fetch(`http://127.0.0.1:5500/user/${user.id}`, {
      method: "DELETE",
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      onDelete(user.id);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation: ', error);
    });
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col items-center text-center w-64 h-92">
      <img src={user.image || avatar} alt="profile-pic" className="w-24 h-24 rounded-full object-cover mb-4" />
      <h2 className="text-Text font-medium text-lg mb-2">
        {user.username}
      </h2>
      <p className="text-sm mb-2 text-Variant2">Email: {user.email}</p>
      <p className="text-sm mb-2 text-Variant2">{user.role}</p>
      <button onClick={handleDelete} className="mt-4 rounded px-2 py-1 bg-Secondary text-white">
        Delete
      </button>
    </div>
  );
};