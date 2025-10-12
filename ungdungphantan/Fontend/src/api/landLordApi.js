import axios from "axios";
const BASE_URL = "http://localhost:3000"; // URL của Landlord-service backend
export const registerLandLord = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/landlords/register`, data);
    return res.data;
  } catch (err) {
    return err.response?.data || { message: "Server error" };
  }
};
