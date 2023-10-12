import axios from "axios";

export const generateMailFromSubject = async (subject: string) => {
  const body = {
    subject,
  };

  const { data: chatCompletion } = await axios.post("/api/openai", body);

  return chatCompletion;
};
