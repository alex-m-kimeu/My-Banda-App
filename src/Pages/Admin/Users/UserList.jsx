import { UserTable } from "./UserTable";
import { UserCard } from "./UserCard";

export const UserList = ({ users, onDelete }) => {
  return (
    <div className="flex h-auto font">
      <div className="relative overflow-x-auto w-full">
        <div className="sm:hidden flex flex-wrap justify-center gap-4">
          {users.map((user) => {
            return <UserCard key={user.id} user={user} onDelete={onDelete} />;
          })}
        </div>
        <table className="hidden sm:table w-full mx-auto text-left">
          <thead className="text-[18px] bg-Variant3  text-Text">
            <tr className="border-[6px] border-white">
              <th className="p-[10px]" >Username</th>
              <th className="p-[10px]" >Email Address</th>
              <th className="p-[10px]" >Role</th>
              <th className="p-[10px] flex justify-center items-center" >Actions</th>
            </tr>
          </thead>
          <tbody className="text-[16px] font-normal text-Variant2">
            {users.map((user) => {
              return <UserTable key={user.id} user={user} onDelete={onDelete} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}