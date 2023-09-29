"use client";

import React from "react";

import {
  GridItem,
  Text,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  HStack,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { rrulestr } from "rrule";

import { getEvents } from "@/services/eventsService";

import { selectIsExpanded } from "@/redux/slices/sidebarSlice";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/userSlice";

import { eventColumns } from "@/data/eventColumns";

import { Event } from "@/types/event";

const Events = () => {
  const isExpanded = useSelector(selectIsExpanded);
  const user = useSelector(selectUser);

  const { data, isLoading } = useQuery(
    ["events", user?.email],
    () => getEvents(user?.email!),
    {
      enabled: !!user?.email,
    }
  );

  // title + description
  // start time
  // duration
  // organizer email
  // location
  // no.of participants

  const rruleToText = (rrule: string[]) => {
    if (!rrule.length) {
      return "Does not repeat";
    }

    return rrule.map((rule) => rrulestr(rule).toText()).join(", ");
  };

  return (
    <GridItem
      colSpan={{
        base: 8,
        xl: isExpanded ? 8 : 9,
      }}
    >
      <HStack alignItems="baseline" mt="6" px="2" gap="3">
        <Text fontSize="2xl" fontWeight="medium">
          Upcoming Events
        </Text>

        <Text fontSize="sm" fontWeight="normal">
          (Next 7 days)
        </Text>
      </HStack>

      {isLoading ? (
        <Stack mt="12" mr="8" spacing="4">
          <Skeleton height="32px" />
          <Skeleton height="32px" />
          <Skeleton height="32px" />
        </Stack>
      ) : (
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
              {data &&
                data.map((event: Event, i: number) => (
                  <Tr
                    key={event.id}
                    _hover={{
                      bg: "gray.100",
                    }}
                  >
                    {/* title */}
                    <Td fontSize="sm">{event.title}</Td>
                    {/* date */}
                    <Td fontSize="sm">
                      {moment(event.when.start_time).format("ll")}
                    </Td>
                    {/* time */}
                    <Td fontSize="sm">
                      {moment(event.when.start_time).format("LT")} -{" "}
                      {moment(event.when.end_time).format("LT")}
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
      )}
    </GridItem>
  );
};

export default Events;
