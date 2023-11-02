import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// toast
import { toast } from "react-hot-toast";

// types
import { User } from "../../types/User";

//Api
import { getSingleUser, updateSingleUser } from "../../Api/api";

const SingleUserPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState<string | null>(null);

  const navigate = useNavigate();

  // search params
  const Params = useParams();
  const id = Params["id"];
  useEffect(() => {
    if (id) handleGetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const handleGetUser = async () => {
    try {
      const response = await getSingleUser(id || "");
      setUser(response?.data?.data || null);
      setName(response?.data?.data?.name || "");
    } catch (error) {
      setUser(null);
      toast.error("Error while loading user");
    }
  };
  const handleUpdateUser = async () => {
    if (name) {
      try {
        const response = await updateSingleUser(id || "", { name });
        toast.success(response?.data?.message || "User Updated Successfully.");
      } catch (error) {
        toast.error("Error while loading user");
      }
    }
  };
  return (
    <>
      <div className="font-body-2">
        Name :{" "}
        <input
          type="text"
          name="name"
          value={name || ""}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button onClick={handleUpdateUser}>Update User</button>
      </div>
      <div>
        <div className="font-head-2">P5</div>
        <div className="font-body-2">P5 balance - {user?.P5?.balance}</div>
        <Link className="font-body-2" to={`/${user?._id}/p5`}>
          Edit
        </Link>
      </div>
      <div>
        <div className="font-head-2">Reward</div>
        <div className="font-body-2">
          Reward Balance - {user?.Reward?.balance}
        </div>
        <Link className="font-body-2" to={`/${user?._id}/reward`}>
          Show
        </Link>
        <button
          type="button"
          onClick={() => {
            navigate(`/${user?._id}/reward/new`);
          }}
        >
          Give Reward
        </button>
      </div>
    </>
  );
};

export default SingleUserPage;
