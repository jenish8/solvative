import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// toast
import { toast } from "react-hot-toast";

// types
import { User } from "../../types/User";

// Apis
import { listUsers } from "../../Api/api";

const ListUserPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  // navigate
  const navigate = useNavigate();

  useEffect(() => {
    handleGetUsers();
  }, []);
  const handleGetUsers = async () => {
    try {
      const response = await listUsers();
      setUsers(response?.data?.data || []);
    } catch (error) {
      setUsers([]);
      toast.error("Error while loading users");
    }
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <td>Sr. No.</td>
              <td>Name</td>
              <td>P5 balance</td>
              <td>Reward balance</td>
              <td>Action</td>
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{user?.name || ""}</td>
                <td>{user?.P5?.balance || 0}</td>
                <td>{user?.Reward?.balance || 0}</td>
                <td>
                  <Link to={`/${user?._id}`}>Edit</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button
          type="button"
          onClick={() => {
            navigate("/new");
          }}
        >
          Create User
        </button>
      </div>
    </>
  );
};

export default ListUserPage;
