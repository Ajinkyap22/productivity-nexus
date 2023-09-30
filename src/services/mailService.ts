import axios from "axios";

import { Recipient } from "@/types/Recipient";
import { Mail, ScheduledMail } from "@/types/Mail";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMail = async (email: string) => {
  const body = {
    email,
  };

  const response = await axios.post(`${API_URL}/read_email`, body);

  return response.data.Inbox;
};

export const getSentMail = async (email: string) => {
  const body = {
    email,
  };

  const response = await axios.post(`${API_URL}/read_email`, body);

  return response.data["Sent Mail"];
};

export const getTrashMail = async (email: string) => {
  const body = {
    email,
  };

  const response = await axios.post(`${API_URL}/read_email`, body);

  return response.data.Trash;
};

export const getSpamMail = async (email: string) => {
  const body = {
    email,
  };

  const response = await axios.post(`${API_URL}/read_email`, body);

  return response.data.Spam;
};

export const getLabelMail = async (email: string, label: string) => {
  const body = {
    email,
  };

  const response = await axios.post(`${API_URL}/read_email`, body);

  console.log(response.data);

  return response.data[`Category ${label}`];
};

export const sendMail = async (
  senderMail: string,
  subject: string,
  mailBody: string,
  recipientArray: Recipient[]
) => {
  const body = {
    sender_email: senderMail,
    subject,
    body: mailBody,
    recipient_array: recipientArray,
  };

  const response = await axios.post(`${API_URL}/send_email`, body);

  return response.data;
};

export const starMail = async (email: string, starredEmail: Mail) => {
  const body = {
    email,
    starredEmail: starredEmail,
  };

  const response = await axios.post(`${API_URL}/star_email`, body);

  return response.data;
};

export const getStarredMail = async (email: string) => {
  const body = {
    email,
  };

  const response = await axios.post(`${API_URL}/starred_mails`, body);

  return response.data;
};

export const scheduleMail = async (
  email: string,
  scheduleMail: ScheduledMail
) => {
  const body = {
    email,
    scheduleEmail: scheduleMail,
  };

  const response = await axios.post(`${API_URL}/schedule_email`, body);

  return response.data;
};

export const getScheduledMail = async (email: string) => {
  const body = {
    email,
  };

  const response = await axios.post(`${API_URL}/scheduled_mails`, body);

  return response.data;
};
