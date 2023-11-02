import { useState, useEffect } from "react";

// Types
import { User } from "../../types/User";

import { useParams } from "react-router-dom";
// Apis
import { listUsers, getSingleUser, updateReward } from "../../Api/api";

// toast
import { toast } from "react-hot-toast";

const GiveRewardPage = () => {
  const [rewardAmt, setRewardAmt] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // search params
  const searchParams = useParams();
  const id = searchParams["id"];

  useEffect(() => {
    handleGetUsers();
  }, []);
  useEffect(() => {
    if (id) handleGetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const handleGetUser = async () => {
    try {
      const response = await getSingleUser(id || "");
      setCurrentUser(response?.data?.data || null);
    } catch (error) {
      setCurrentUser(null);
      toast.error("Error while loading user");
    }
  };
  const handleGetUsers = async () => {
    try {
      const response = await listUsers();
      setUsers(response?.data?.data || []);
    } catch (error) {
      setUsers([]);
      toast.error("Error while loading users");
    }
  };
  const handleUpdateReward = async (body: {
    user_id: string;
    amount: number;
  }) => {
    try {
      console.log(id && currentUser);
      if (id && currentUser) {
        const response = await updateReward(currentUser?._id || "", body);
        toast.success(
          response?.data?.message || "Reward Updated Successfully."
        );
      }
    } catch (error) {
      toast.error("Error while updating rewards");
    }
  };
  return (
    <>
      <div>
        <input
          type="number"
          value={rewardAmt}
          onChange={(e) => setRewardAmt(parseInt(e.target.value))}
        />
      </div>
      <div>
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
                <>
                  {user?._id !== currentUser?._id ? (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{user?.name || ""}</td>
                      <td>{user?.P5?.balance || 0}</td>
                      <td>{user?.Reward?.balance || 0}</td>
                      <td>
                        <button
                          type="button"
                          disabled={rewardAmt > (currentUser?.P5?.balance || 0)}
                          onClick={() => {
                            handleUpdateReward({
                              amount: rewardAmt,
                              user_id: user?._id,
                            });
                          }}
                        >
                          Give Rewards
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GiveRewardPage;
