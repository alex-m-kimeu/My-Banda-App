import { useState, useEffect } from "react";
import { UserList } from "./UserList";
import { Search } from "./Search";

export const UsersAdmin = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://127.0.0.1:5500/users', {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })

            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error(error));
    }, []);

    // Filter users
    const filteredUsers = users.filter(user => {
        return user.username.toLowerCase().includes(search.toLowerCase());
    });

    // Delete user
    function handleDelete(id) {
        const newUsers = users.filter((user) => user.id !== id);
        setUsers(newUsers);
    }

    return (
        <div>
            <h2 className="text-Text font-bold text-xl text-center lg:text-left py-5">
                Users
            </h2>
            <Search search={search} setSearch={setSearch} />
            <UserList users={filteredUsers} onDelete={handleDelete} />
        </div>
    );
};