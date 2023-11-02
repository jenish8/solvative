import { useState, useEffect } from "react";

// moment
import moment from "moment";

import { useParams } from "react-router-dom";

// toast
import { toast } from "react-hot-toast";

// types
import { User } from "../../types/User";

//Api
import { getSingleUser } from "../../Api/api";

const RewardPage = () => {
  const [user, setUser] = useState<User | null>(null);

  // search params
  const searchParams = useParams();
  const id = searchParams["id"];
  useEffect(() => {
    if (id) handleGetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const handleGetUser = async () => {
    try {
      const response = await getSingleUser(id || "");
      setUser(response?.data?.data || null);
    } catch (error) {
      setUser(null);
      toast.error("Error while loading user");
    }
  };
  return (
    <div>
      <div className="font-body-2">
        <p className="font-head-1">Reward</p>
        <table>
          <thead>
            <tr>
              <th>
                <td>Sr. No.</td>
                <td>Given By</td>
                <td>Given</td>
                <td>Date - Time</td>
              </th>
            </tr>
          </thead>
          <tbody>
            {user?.Reward?.history?.map((reward, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{reward?.givenBy?.name || ""}</td>
                  <td>{reward?.amount || 0}</td>
                  <td>
                    {moment(reward?.dateStamp).format("YYYY-MM-DD HH:mm")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RewardPage;
