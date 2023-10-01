"use client";

import React, { useState } from "react";

import { GridItem, HStack, Spinner } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { selectIsExpanded } from "@/redux/slices/sidebarSlice";
import { selectUser } from "@/redux/slices/userSlice";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import rrulePlugin from "@fullcalendar/rrule";

import { getEvents } from "@/services/eventsService";

import { useQuery } from "@tanstack/react-query";
import moment from "moment";

import { Event } from "@/types/event";

const Calendar = () => {
  const isExpanded = useSelector(selectIsExpanded);
  const user = useSelector(selectUser);

  const [events, setEvents] = useState([]);

  const { isLoading } = useQuery(
    ["events", user?.email],
    () => getEvents(user?.email!),
    {
      enabled: !!user?.email,
      onSuccess: (data) => {
        setEvents(
          data.map((event: Event) => {
            const start = new Date(unixToISO(event.when.start_time!));
            const end = new Date(unixToISO(event.when.end_time!));

            return {
              id: event.id,
              title: event.title,
              start,
              end,
              rrule: event.recurrence ? event.recurrence.rrule[0] : null,
              backgroundColor: "#2FAC85",
              borderColor: "transparent",
            };
          })
        );
      },
    }
  );

  const unixToISO = (unix: number) => {
    return moment.unix(unix).toLocaleString();
  };

  return (
    <GridItem
      colSpan={{
        base: 8,
        xl: isExpanded ? 8 : 9,
      }}
      pr="4"
      py="4"
    >
      {isLoading ? (
        <HStack justifyContent="center" alignItems="center" h="96vh">
          <Spinner size="lg" color="primary" />
        </HStack>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, rrulePlugin]}
          initialView="dayGridMonth"
          events={events}
        />
      )}
    </GridItem>
  );
};

export default Calendar;
