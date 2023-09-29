import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUser = async (email: string) => {
  const response = await axios.get(`${API_URL}/get_user_details/${email}`);

  return response.data;
};

export const generateToken = async (token: string) => {
  const response = await axios.post(`${API_URL}/nylas/exchange-mailbox-token`, {
    token,
  });

  return response.data;
};
