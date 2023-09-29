import React from "react";

import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "@chakra-ui/react";

import { eventColumns } from "@/data/eventColumns";

import { Event } from "@/types/event";
import moment from "moment";

import { rrulestr } from "rrule";

type Props = {
  events: Event[];
};

const EventsList = ({ events }: Props) => {
  const rruleToText = (rrule: string[]) => {
    if (!rrule.length) {
      return "Does not repeat";
    }

    return rrule.map((rule) => rrulestr(rule).toText()).join(", ");
  };

  return (
    <TableContainer mt="12" mr="8">
      <Table variant="simple">
        <Thead>
          <Tr>
            {eventColumns.map((column, i) => (
              <Th key={i}>{column}</Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {events &&
            events.map((event: Event, i: number) => (
              <Tr
                key={event.id}
                _hover={{
                  bg: "gray.100",
                }}
                cursor="pointer"
              >
                {/* title */}
                <Td fontSize="sm">{event.title}</Td>
                {/* date */}
                <Td fontSize="sm">
                  {moment.unix(event.when.start_time).format("ll")}
                </Td>
                {/* time */}
                <Td fontSize="sm">
                  {moment.unix(event.when.start_time).format("LT")} -{" "}
                  {moment.unix(event.when.end_time).format("LT")}
                </Td>
                {/* organizer */}
                <Td fontSize="sm">{event.organizer_email}</Td>
                {/* location */}
                <Td fontSize="sm">{event.location || "Not Set"}</Td>
                {/* repeats */}
                <Td fontSize="sm">{rruleToText(event.recurrence.rrule)}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default EventsList;
