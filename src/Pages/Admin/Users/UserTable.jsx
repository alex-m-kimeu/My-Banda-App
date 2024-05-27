import { IoTrashBin } from "react-icons/io5";
import avatar from "../../../assets/avatar.jpeg";

export const UserTable = ({ user, onDelete }) => {

  function handleDelete() {
    const token = localStorage.getItem('token')

    fetch(`https://my-banda.onrender.com/user/${user.id}`, {
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
    <tr key={user.id} className="bg-white border-[6px] border-white">
      <td className="p-[10px]">
        <img
          className="inline-block h-6 w-6 rounded-full object-cover mr-1"
          src={user.image || avatar}
          alt="profile-pic"
        />
        {user.username}
      </td>
      <td className="p-[10px]">{user.email}</td>
      <td className="p-[10px]">{user.role}</td>
      <td className="p-[10px] flex justify-center items-center">
        <button onClick={handleDelete}>
          <IoTrashBin className='fill-Red' />
        </button>
      </td>
    </tr>
  );
}