"use client";

import React, { useEffect, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  FormLabel,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  scheduledAt: string;
  isLoading: boolean;
  onClose: () => void;
  handleSchedule: (scheduledAt: string) => void;
  handleSubmit: () => void;
};

const ScheduleModal = ({
  isOpen,
  scheduledAt,
  isLoading,
  onClose,
  handleSchedule,
  handleSubmit,
}: Props) => {
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateDateAndTime(e.target.value);

    handleSchedule(e.target.value);
  };

  const validateDateAndTime = (date: string) => {
    const dateAndTime = new Date(date);
    const currentDate = new Date();

    if (dateAndTime < currentDate) {
      setError("Date and time must be in the future");
      return;
    }

    setError("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Schedule Mail</ModalHeader>

        <ModalCloseButton />

        <ModalBody pb={6}>
          <FormControl isInvalid={!!error} isRequired>
            <FormLabel>Select Date & Time</FormLabel>

            <Input
              type="datetime-local"
              value={scheduledAt}
              onChange={handleChange}
            />

            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose} fontWeight="normal">
            Cancel
          </Button>

          <Button
            bg="primary"
            color="white"
            fontWeight="normal"
            _hover={{
              bg: "primaryDark",
            }}
            _disabled={{
              opacity: 0.5,
            }}
            isDisabled={!!error || !scheduledAt}
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ScheduleModal;
