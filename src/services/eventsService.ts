import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getEvents = async (email: string) => {
  if (!email) return;

  const response = await axios.get(
    `${API_URL}/get_availability/?email=${email}`
  );

  return response.data;
};

export const createEvent = async (
  email: string,
  title: string,
  description: string,
  startTime: number,
  endTime: number,
  participants: string
) => {
  const body = {
    email,
    description,
    title,
    startTime,
    endTime,
    participants,
  };

  const response = await axios.post(`${API_URL}/create-events`, body);

  return response.data;
};
