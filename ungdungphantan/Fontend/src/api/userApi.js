import axios from "axios";

const BASE_URL = "http://localhost:3000"; // URL của User-service backend

export const registerUser = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/users/register`, data);
    return res.data;
  } catch (err) {
    return err.response?.data || { message: "Server error" };
  }
};
