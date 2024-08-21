import axios from "axios";
import config from "../config";
export const verifyAdmin = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${config.url}/admin/verify`, {
    headers: {
      token: token,
    },
  });
  return response.data;
};


export async function getUserId(email) {

  const response = await axios.get(`${config.url}/author/getUserId/${email}`)

  return response.data
}

