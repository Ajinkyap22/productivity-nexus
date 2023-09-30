import React from "react";

import { Text, VStack } from "@chakra-ui/react";
import moment from "moment";

import { Event } from "@/types/event";

import { rruleToText } from "@/utils/rruleToText";

type Props = {
  selectedEvent: Event | null;
};

const EventDetails = ({ selectedEvent }: Props) => {
  return (
    <VStack alignItems="flex-start" gap="6">
      {/* title */}
      <VStack alignItems="flex-start" gap="1">
        <Text fontWeight="medium" fontSize="lg">
          Title
        </Text>

        <Text fontSize="sm">{selectedEvent?.title}</Text>
      </VStack>

      {/* description */}
      <VStack alignItems="flex-start" gap="1">
        <Text fontWeight="medium" fontSize="lg">
          Description
        </Text>

        <Text fontSize="sm">{selectedEvent?.description || "Not Given"}</Text>
      </VStack>

      {/* date and time */}
      <VStack alignItems="flex-start" gap="1">
        <Text fontWeight="medium" fontSize="lg">
          Date and Time
        </Text>

        <Text fontSize="sm">
          {moment.unix(selectedEvent?.when.start_time!).format("ll")},{" "}
          {moment.unix(selectedEvent?.when.start_time!).format("LT")} -{" "}
          {moment.unix(selectedEvent?.when.end_time!).format("LT")}
        </Text>
      </VStack>

      {/* organizer */}
      <VStack alignItems="flex-start" gap="1">
        <Text fontWeight="medium" fontSize="lg">
          Organizer
        </Text>

        <Text fontSize="sm">{selectedEvent?.organizer_email}</Text>
      </VStack>

      {/* location */}
      <VStack alignItems="flex-start" gap="1">
        <Text fontWeight="medium" fontSize="lg">
          Location
        </Text>

        <Text fontSize="sm">{selectedEvent?.location || "Not Set"}</Text>
      </VStack>

      {/* repeats */}
      <VStack alignItems="flex-start" gap="1">
        <Text fontWeight="medium" fontSize="lg">
          Repeats
        </Text>

        <Text fontSize="sm">
          {rruleToText(selectedEvent?.recurrence?.rrule!)}
        </Text>
      </VStack>

      {/* participants */}
      <VStack alignItems="flex-start" gap="1">
        <Text fontWeight="medium" fontSize="lg">
          Participants
        </Text>

        <Text fontSize="sm">
          {selectedEvent?.participants
            .map((participant) => participant.email)
            .join(", ")}
        </Text>
      </VStack>

      {/* status */}
      <VStack alignItems="flex-start" gap="1">
        <Text fontWeight="medium" fontSize="lg">
          Status
        </Text>

        <Text fontSize="sm">{selectedEvent?.status}</Text>
      </VStack>
    </VStack>
  );
};

export default EventDetails;
