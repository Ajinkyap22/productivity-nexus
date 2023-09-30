import { rrulestr } from "rrule";

export const rruleToText = (rrule: string[]) => {
  if (!rrule || !rrule.length) {
    return "Does not repeat";
  }

  return rrule.map((rule) => rrulestr(rule).toText()).join(", ");
};
