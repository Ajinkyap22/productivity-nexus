export interface Event {
  account_id: string;
  busy: boolean;
  calendar_id: string;
  customer_event_id: string;
  description: string;
  hide_participants: boolean;
  ical_uid: string;
  id: string;
  location: string;
  message_id: string;
  notifications: any[];
  object: string;
  organizer_email: string;
  organizer_name: string;
  original_start_time: null;
  owner: string;
  participants: any[];
  read_only: boolean;
  recurrence: Recurrence;
  reminders: null;
  status: string;
  title: string;
  visibility: string;
  when: When;
}

export interface Recurrence {
  rrule: string[];
  timezone: string;
}

export interface When {
  end_time: number;
  object: string;
  start_time: number;
}
