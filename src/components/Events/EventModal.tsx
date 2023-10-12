import React from "react";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import EventDetails from "@/components/Events/EventDetails";
import EventForm from "@/components/Events/EventForm";

import { Event } from "@/types/event";

type Props = {
  modalMode: "create" | "view";
  selectedEvent: Event | null;
  isOpen: boolean;
  onClose: () => void;
};

const EventModal = ({ modalMode, selectedEvent, isOpen, onClose }: Props) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
      <DrawerOverlay />

      <DrawerContent pb="3" pt="6">
        <DrawerCloseButton outline="none" />

        <DrawerHeader fontSize="2xl" color="blackAlpha.800">
          {modalMode === "create" ? "Create Event" : "Event Details"}
        </DrawerHeader>

        <DrawerBody>
          {modalMode === "view" ? (
            <EventDetails selectedEvent={selectedEvent} />
          ) : (
            <EventForm onClose={onClose} />
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default EventModal;
