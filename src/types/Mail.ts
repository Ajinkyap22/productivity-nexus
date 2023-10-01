import { Recipient } from "@/types/Recipient";

export type Mail = {
  subject: string;
  body: string;
  recipientArray: Recipient[];
};

export type ScheduledMail = Mail & {
  scheduledAt: string;
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
