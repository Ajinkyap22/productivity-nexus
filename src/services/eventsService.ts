import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getEvents = async (email: string) => {
  if (!email) return;

  const response = await axios.get(
    `${API_URL}/get_availability/?email=${email}`
  );

  return response.data;
};
