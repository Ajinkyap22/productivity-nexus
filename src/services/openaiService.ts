import openai from "@/config/openai";

export const generateMailFromSubject = async (subject: string) => {
  // prompt gpt for mail body based on subject
  const prompt = `Write an email to a based on the following subject ${subject}. The email should be polite and professional.
    Do not provide any explanation, only return the email body.
    \n\nSubject: ${subject}\n\nEmail:`;

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return chatCompletion.choices[0].message.content;
};
