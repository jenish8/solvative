import Axios from "../axiosInstance";

export const listUsers = async () => {
  return Axios.get("/");
};

export const createUser = async (body: { name: string }) => {
  return Axios.post("/new", body);
};

export const getSingleUser = async (id: string) => {
  return Axios.get(`/${id}`);
};

export const updateSingleUser = async (id: string, body: { name: string }) => {
  return Axios.patch(`/${id}`, body);
};

export const updateP5 = async (
  id: string,
  body: { user_id: string; amount: number }
) => {
  return Axios.patch(`/${id}/update/revert-reward`, body);
};

export const updateReward = async (
  id: string,
  body: { user_id: string; amount: number }
) => {
  return Axios.patch(`/${id}/update/reward`, body);
};
