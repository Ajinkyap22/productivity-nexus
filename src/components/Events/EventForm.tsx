import React, { useEffect, useState } from "react";

import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  Textarea,
  FormErrorMessage,
  Button,
  HStack,
  useToast,
} from "@chakra-ui/react";

import { validateEmail } from "@/utils/validateEmail";

import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "@/services/eventsService";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/userSlice";
import axios, { AxiosError } from "axios";

type Props = {
  onClose: () => void;
};

const EventForm = ({ onClose }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState("");

  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");
  const [participantsError, setParticipantsError] = useState("");

  const [disabled, setDisabled] = useState(true);

  const user = useSelector(selectUser);

  const queryClient = useQueryClient();

  const toast = useToast();

  const createEventMutation = useMutation(
    ({
      email,
      title,
      description,
      startTime,
      endTime,
      participants,
    }: {
      email: string;
      title: string;
      description: string;
      startTime: number;
      endTime: number;
      participants: string;
    }) =>
      createEvent(email, title, description, startTime, endTime, participants)
  );

  useEffect(() => {
    validateTime(startTime, endTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, startTime, endTime]);

  useEffect(() => {
    const isError = !!startTimeError || !!endTimeError || !!participantsError;
    const isEmpty = !title || !date || !startTime || !endTime;

    setDisabled(isError || isEmpty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    title,
    date,
    startTime,
    endTime,
    participantsError,
    startTimeError,
    endTimeError,
  ]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // validate time
    validateTime(e.target.value, endTime);

    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // validate time
    validateTime(startTime, e.target.value);

    setEndTime(e.target.value);
  };

  const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (participantsError) {
      validateParticipants(e.target.value);
    }

    setParticipants(e.target.value);
  };

  const validateTime = (startValue: string, endValue: string) => {
    const now = new Date();
    const selectedDate = new Date(date);

    const startTime = moment(startValue, "HH:mm");
    const endTime = moment(endValue, "HH:mm");

    // if end time is before start time
    if (endTime.isBefore(startTime) || endTime.isSame(startTime)) {
      setStartTimeError("Start time must be before end time");
      setEndTimeError("End time must be after start time");
      return;
    }

    // if selected date is today
    if (selectedDate.getDate() === now.getDate()) {
      // if end time is before current time
      if (endTime.isBefore(moment(now))) {
        setEndTimeError("End time must be a future time");
        return;
      } else {
        setEndTimeError("");
      }

      // if start time is before current time
      if (startTime.isBefore(moment(now)) || startTime.isSame(moment(now))) {
        setStartTimeError("Start time must be a future time");
        return;
      } else {
        setStartTimeError("");
      }
    }

    setStartTimeError("");
    setEndTimeError("");
  };

  const validateParticipants = (value: string) => {
    const emails = value.split(",");

    for (let email of emails) {
      if (!validateEmail(email) && email.trim() !== "") {
        setParticipantsError(`${email} is not a valid email address`);
        return;
      }
    }

    setParticipantsError("");
  };

  const handleSubmit = () => {
    // convert to unix timestamp & get start and end time
    const startTimeUnix = moment(
      `${date} ${startTime}`,
      "YYYY-MM-DD HH:mm"
    ).unix();

    const endTimeUnix = moment(`${date} ${endTime}`, "YYYY-MM-DD HH:mm").unix();

    // convert participants to comma separated string without spaces or trailing commas
    const participantsString = participants
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email !== "")
      .join(",");

    createEventMutation.mutate(
      {
        email: user?.email!,
        title,
        description,
        startTime: startTimeUnix,
        endTime: endTimeUnix,
        participants: participantsString,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["events"]);
          onClose();
        },
        onError: (error: unknown) => {
          if (axios.isAxiosError(error)) {
            toast({
              title: error.response?.data.error,
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top-right",
              containerStyle: {
                marginTop: "1rem",
              },
            });
          }
        },
      }
    );
  };

  return (
    <VStack h="full" justifyContent="space-between">
      <VStack w="full" gap="6">
        <FormControl isRequired>
          {/* title */}
          <FormLabel fontWeight="medium" size="lg">
            Title
          </FormLabel>

          <Input
            type="text"
            placeholder="Title of the event"
            fontSize="sm"
            value={title}
            onChange={handleTitleChange}
          />
        </FormControl>

        {/* description */}
        <FormControl>
          <FormLabel fontWeight="medium" size="lg">
            Description
          </FormLabel>

          <Textarea
            placeholder="Description of the event"
            fontSize="sm"
            resize="none"
            value={description}
            onChange={handleDescriptionChange}
          />
        </FormControl>

        {/* date */}
        <FormControl isRequired>
          <FormLabel fontWeight="medium" size="lg">
            Date
          </FormLabel>

          {/* date input with past dates disabled */}
          <Input
            type="date"
            fontSize="sm"
            min={new Date().toISOString().split("T")[0]}
            value={date}
            onChange={handleDateChange}
          />
        </FormControl>

        {/* start time */}
        <FormControl isRequired isInvalid={!!startTimeError}>
          <FormLabel fontWeight="medium" size="lg">
            Start Time
          </FormLabel>

          {/* time input */}
          <Input
            type="time"
            fontSize="sm"
            value={startTime}
            onChange={handleStartTimeChange}
          />

          {/* error message */}
          <FormErrorMessage>{startTimeError}</FormErrorMessage>
        </FormControl>

        {/* end time */}
        <FormControl isRequired isInvalid={!!endTimeError}>
          <FormLabel fontWeight="medium" size="lg">
            End Time
          </FormLabel>

          {/* time input */}
          <Input
            type="time"
            fontSize="sm"
            value={endTime}
            onChange={handleEndTimeChange}
          />

          {/* error message */}
          <FormErrorMessage>{endTimeError}</FormErrorMessage>
        </FormControl>

        {/* participants */}
        <FormControl isInvalid={!!participantsError}>
          <FormLabel fontWeight="medium" size="lg">
            Participants
          </FormLabel>

          {/* participants textarea*/}
          <Input
            placeholder="Email addresses of participants, separated by commas"
            fontSize="sm"
            resize="none"
            value={participants}
            onChange={handleParticipantsChange}
            onBlur={(e) => validateParticipants(e.target.value)}
          />

          {/* error message */}
          <FormErrorMessage>{participantsError}</FormErrorMessage>
        </FormControl>
      </VStack>

      <HStack w="full" alignSelf="flex-end" mb="2">
        <Button
          variant="outline"
          mr={3}
          onClick={onClose}
          flex={1}
          py="6"
          h="0"
          borderRadius="lg"
        >
          Cancel
        </Button>

        <Button
          bg="primary"
          color="white"
          flex={1}
          py="6"
          h="0"
          borderRadius="lg"
          isDisabled={disabled}
          _hover={{
            bg: "primaryDark",
          }}
          _disabled={{
            opacity: 0.6,
            cursor: "default",
          }}
          isLoading={createEventMutation.isLoading}
          onClick={handleSubmit}
        >
          Create
        </Button>
      </HStack>
    </VStack>
  );
};

export default EventForm;
