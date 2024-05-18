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
            .then(data => {
                const nonAdminUsers = data.filter(user => user.role !== 'admin');
                setUsers(nonAdminUsers);
            })
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
        <div className="p-[10px] space-y-4">
            <h1 className="text-Text font-bold text-xl text-center lg:text-left">
                Users
            </h1>
            <div className="w-full md:w-1/3">
                <Search search={search} setSearch={setSearch} />
            </div>
            <UserList users={filteredUsers} onDelete={handleDelete} />
        </div>
    );
};