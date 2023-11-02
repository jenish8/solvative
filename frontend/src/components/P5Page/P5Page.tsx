import { useState, useEffect } from "react";

// router
import { useParams } from "react-router-dom";

// moment
import moment from "moment";

// types
import { User } from "../../types/User";

//Api
import { getSingleUser, updateP5 } from "../../Api/api";

// toast
import { toast } from "react-hot-toast";

const P5Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [amount, setAmount] = useState<number>(0);

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

  const handleUpdateP5 = async (body: { user_id: string; amount: number }) => {
    if (id && user) {
      try {
        const response = await updateP5(id || "", body);
        toast.success(response?.data?.message || "User Updated Successfully.");
      } catch (error) {
        toast.error("Error while updating P5");
      }
    }
  };
  return (
    <>
      <div>
        <p className="font-head-1">P5</p>
        <div>Current User Balance : {user?.P5?.balance}</div>
        <div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <td>Sr. No.</td>
                <td>Given To</td>
                <td>Given</td>
                <td>Date - Time</td>
                <td>Action</td>
              </th>
            </tr>
          </thead>
          <tbody>
            {user?.P5?.history?.map((p5, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{p5?.givenTo?.name || ""}</td>
                  <td>{p5?.amount || 0}</td>
                  <td>{moment(p5?.dateStamp).format("YYYY-MM-DD HH:mm")}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleUpdateP5({
                          amount: p5?.amount,
                          user_id: p5?.givenTo?._id,
                        });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default P5Page;
