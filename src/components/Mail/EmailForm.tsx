import React, { useEffect, useState } from "react";

import {
  HStack,
  VStack,
  Text,
  Button,
  Image,
  FormControl,
  Input,
  Divider,
  Textarea,
  FormErrorMessage,
  ButtonGroup,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

import { validateEmail } from "@/utils/validateEmail";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import uniqid from "uniqid";

import { Recipient } from "@/types/Recipient";

import { scheduleMail, sendMail } from "@/services/mailService";
import { generateMailFromSubject } from "@/services/openaiService";

import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/userSlice";

import ScheduleModal from "@/components/Mail/ScheduleModal";
import SentimentAnalysis from "@/components/Mail/SentimentAnalysis";
import Summarize from "@/components/Mail/Summarize";
import SpeechInput from "@/components/Mail/SpeechInput";

import { ScheduledMail } from "@/types/Mail";

type Props = {
  handleClose: () => void;
};

const EmailForm = ({ handleClose }: Props) => {
  const [sendTo, setSendTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [scheduledAt, setScheduledAt] = useState<string>("");

  const [sendToError, setSendToError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const user = useSelector(selectUser);
  const toast = useToast();
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const sendMailMutation = useMutation(
    ({
      senderMail,
      subject,
      body,
      recipientArray,
    }: {
      senderMail: string;
      subject: string;
      body: string;
      recipientArray: Recipient[];
    }) => sendMail(senderMail, subject, body, recipientArray)
  );

  const scheduleMailMutation = useMutation(
    ({
      email,
      scheduledMail,
    }: {
      email: string;
      scheduledMail: ScheduledMail;
    }) => scheduleMail(email, scheduledMail)
  );

  const generateMailMutation = useMutation((subject: string) =>
    generateMailFromSubject(subject)
  );

  useEffect(() => {
    if (sendToError || !sendTo || !body) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [sendTo, body, sendToError]);

  const handleSendToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (sendToError) {
      validateSendTo(e.target.value);
    }

    setSendTo(e.target.value);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleTranscriptChange = (transcript: string) => {
    setBody(transcript);
  };

  const handleScheduledAtChange = (date: string) => {
    setScheduledAt(date);
  };

  const validateSendTo = (value: string) => {
    const emails = value.split(",");

    for (let email of emails) {
      if (!validateEmail(email) && email.trim() !== "") {
        setSendToError(`${email} is not a valid email address`);
        return;
      }
    }

    setSendToError("");
  };

  const handleSend = () => {
    const emails = sendTo.split(",");

    const recipientArray: Recipient[] = [];

    for (let email of emails) {
      recipientArray.push({
        email: email.trim(),
        name: email.trim(),
      });
    }

    sendMailMutation.mutate(
      {
        senderMail: user?.email || "",
        subject: subject || "(no subject)",
        body,
        recipientArray,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["mail"]);

          handleClose();

          toast({
            title: "Email sent",
            description: "Your email has been sent successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  };

  const handleSchedule = () => {
    const emails = sendTo.split(",");

    const recipientArray: Recipient[] = [];

    for (let email of emails) {
      recipientArray.push({
        email: email.trim(),
        name: email.trim(),
      });
    }

    let date = new Date(scheduledAt);
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);
    let newDate = date.toISOString();

    scheduleMailMutation.mutate(
      {
        email: user?.email!,
        scheduledMail: {
          ID: uniqid(),
          subject: subject || "(no subject)",
          body,
          sentTo: recipientArray,
          sentBy: [
            {
              email: user?.email!,
              name: user?.name!,
            },
          ],
          scheduledAt: newDate,
        },
      },
      {
        onSuccess: () => {
          handleClose();

          toast({
            title: "Email scheduled",
            description: "Your email has been scheduled successfully",
            position: "top-right",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  };

  const handleClear = () => {
    setSendTo("");
    setSubject("");
    setBody("");
    setSendToError("");
  };

  const generateMail = () => {
    generateMailMutation.mutate(subject, {
      onSuccess: (data) => {
        setBody(data!);
      },
    });
  };

  return (
    <VStack
      position="fixed"
      bottom="0"
      right="4"
      bg="white"
      boxShadow="0px 0px 4px 0px rgba(0, 0, 0, 0.25)"
      borderTopRadius="lg"
      width="45%"
      gap="0"
      zIndex="10"
    >
      {/* header */}
      <HStack justifyContent="space-between" w="full" bg="blackAlpha.100" p="2">
        <Text fontWeight="medium">New Mail</Text>

        <Button onClick={handleClose} bg="none" w="0" p="0">
          <Image src="/icons/cross.svg" alt="close" w="4" h="4" />
        </Button>
      </HStack>

      {/* to */}
      <FormControl isInvalid={!!sendToError} isRequired>
        <Input
          placeholder="Send To"
          borderRadius="none"
          border="none"
          fontSize="sm"
          outline="none"
          focusBorderColor="transparent"
          value={sendTo}
          onChange={handleSendToChange}
          onBlur={() => validateSendTo(sendTo)}
        />

        <FormErrorMessage px="3">{sendToError}</FormErrorMessage>
      </FormControl>

      <Divider />

      {/* subject */}
      <HStack w="full">
        <FormControl>
          <Input
            placeholder="Subject"
            borderRadius="none"
            fontSize="sm"
            outline="none"
            border="none"
            focusBorderColor="transparent"
            value={subject}
            onChange={handleSubjectChange}
          />
        </FormControl>

        <Button
          onClick={generateMail}
          isDisabled={!subject}
          isLoading={generateMailMutation.isLoading}
          bg="none"
          _hover={{
            bg: "none",
          }}
          mr="3"
        >
          <Text
            bgGradient="linear-gradient(90deg, #FF00A8 0%, #FF7D00 100%)"
            bgClip="text"
            fontSize="xs"
          >
            Generate From Subject
          </Text>
        </Button>
      </HStack>

      <Divider />

      {/* body */}
      <FormControl isRequired>
        <Textarea
          placeholder="Compose email"
          borderRadius="none"
          fontSize="sm"
          outline="none"
          border="none"
          focusBorderColor="transparent"
          rows={20}
          value={body}
          onChange={handleBodyChange}
        />
      </FormControl>

      <HStack w="full" p="3" justifyContent="space-between">
        <HStack>
          <Summarize isDisabled={!body} content={body} />

          <SentimentAnalysis isDisabled={!body} content={body} />

          <SpeechInput handleTranscript={handleTranscriptChange} />
        </HStack>

        <HStack>
          {/* clear */}
          <Button
            onClick={handleClear}
            isDisabled={sendMailMutation.isLoading}
            bg="none"
            color="primary"
            _hover={{
              bg: "none",
            }}
            _active={{
              bg: "none",
            }}
            fontWeight="normal"
          >
            Clear
          </Button>

          {/* send */}
          <ButtonGroup isAttached>
            <Button
              isLoading={sendMailMutation.isLoading}
              isDisabled={disabled}
              onClick={handleSend}
              bg="primary"
              color="white"
              _hover={{
                bg: "primaryDark",
              }}
              _disabled={{
                opacity: 0.8,
                cursor: "default",
              }}
              fontWeight="normal"
              borderRadius="full"
            >
              Send
            </Button>

            <Popover placement="top-start">
              <PopoverTrigger>
                <Button
                  isDisabled={disabled}
                  w="0"
                  p="0"
                  bg="primary"
                  color="white"
                  _hover={{
                    bg: "primary",
                  }}
                  _active={{
                    bg: "primaryDark",
                  }}
                  _disabled={{
                    opacity: 0.8,
                    cursor: "default",
                  }}
                  fontWeight="normal"
                  borderRadius="full"
                >
                  <Image src="/icons/chevronDown.svg" alt="send" w="4" h="4" />
                </Button>
              </PopoverTrigger>

              <PopoverContent w="unset">
                <PopoverBody p="0">
                  <Button bg="none" gap="2" onClick={onOpen}>
                    <Image
                      src="/icons/schedule.svg"
                      alt="schedule"
                      w="4"
                      h="4"
                    />

                    <Text fontSize="sm" fontWeight="normal">
                      Schedule
                    </Text>
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </ButtonGroup>
        </HStack>
      </HStack>

      <ScheduleModal
        isOpen={isOpen}
        scheduledAt={scheduledAt}
        isLoading={scheduleMailMutation.isLoading}
        onClose={onClose}
        handleSchedule={handleScheduledAtChange}
        handleSubmit={handleSchedule}
      />
    </VStack>
  );
};

export default EmailForm;
