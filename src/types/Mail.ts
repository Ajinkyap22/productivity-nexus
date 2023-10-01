import { Recipient } from "@/types/Recipient";

export type Mail = {
  subject: string;
  body: string;
  recipientArray: Recipient[];
};

export type ScheduledMail = {
  ID: string;
  subject: string;
  body: string;
  scheduledAt: string;
  sentTo: Sent[];
  sentBy: Sent[];
};

export interface AllMail {
  ID: string;
  body: string;
  date: Date;
  sentBy: Sent[];
  sentTo: Sent[];
  snippet: string;
  subject: string;
  unread: boolean;
}

export interface Sent {
  email: string;
  name: string;
}
