import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_TOKEN;


export async function getAccountDashboard(userId: number) {
  const res = await axios.get(
    `${API_URL}/users/${userId}/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  return res.data;
}
