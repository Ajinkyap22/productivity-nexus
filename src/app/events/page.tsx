"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

import {
  GridItem,
  Text,
  HStack,
  Skeleton,
  Stack,
  Button,
  Image,
  useDisclosure,
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";

import { getEvents } from "@/services/eventsService";

import { selectIsExpanded } from "@/redux/slices/sidebarSlice";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/userSlice";

import EventsList from "@/components/Events/EventsList";
const EventModal = dynamic(() => import("@/components/Events/EventModal"));

import { Event } from "@/types/event";

const Events = () => {
  const isExpanded = useSelector(selectIsExpanded);
  const user = useSelector(selectUser);

  const [modalMode, setModalMode] = useState<"create" | "view">("create");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading } = useQuery(
    ["events", user?.email],
    () => getEvents(user?.email!),
    {
      enabled: !!user?.email,
    }
  );

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setModalMode("view");
    onOpen();
  };

  const openCreateModal = () => {
    setModalMode("create");
    onOpen();
  };

  return (
    <GridItem
      colSpan={{
        base: 8,
        xl: isExpanded ? 8 : 9,
      }}
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
        mt="6"
        pl="2"
        pr="8"
      >
        <HStack gap="3" alignItems="baseline">
          <Text fontSize="2xl" fontWeight="medium">
            Upcoming Events
          </Text>

          <Text fontSize="sm" fontWeight="normal">
            (Next 7 days)
          </Text>
        </HStack>

        <Button
          onClick={openCreateModal}
          bg="primary"
          color="white"
          _hover={{
            bg: "primaryDark",
          }}
          gap="2"
        >
          <Image src="/icons/plus.svg" alt="plus" w="4" h="4" />

          <Text fontSize="sm">Create</Text>
        </Button>
      </HStack>

      {isLoading ? (
        <Stack mt="12" mr="8" spacing="4">
          <Skeleton height="32px" />
          <Skeleton height="32px" />
          <Skeleton height="32px" />
        </Stack>
      ) : (
        <EventsList events={data} handleClick={handleEventClick} />
      )}

      <EventModal
        modalMode={modalMode}
        isOpen={isOpen}
        onClose={onClose}
        selectedEvent={selectedEvent}
      />
    </GridItem>
  );
};

export default Events;
