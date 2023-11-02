import { useState } from "react";

// toast
import { toast } from "react-hot-toast";

// Api
import { createUser } from "../../Api/api";

const NewUserPage = () => {
  const [name, setName] = useState<string>("");

  const handleCreateUser = async () => {
    try {
      const response = await createUser({ name });
      toast.success(response?.data?.message || "User Created Successfully");
    } catch (error) {
      toast.error("Error While Creating User");
    }
  };
  return (
    <>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button onClick={handleCreateUser} disabled={!name}>
          Create
        </button>
      </div>
    </>
  );
};

export default NewUserPage;
