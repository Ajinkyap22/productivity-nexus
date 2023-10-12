"use client";

import React from "react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { Button, Image, useToast } from "@chakra-ui/react";

type Props = {
  disabled?: boolean;
  handleTranscript: (transcript: string) => void;
};

const SpeechInput = ({ disabled, handleTranscript }: Props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const toast = useToast();

  const handleStop = () => {
    handleTranscript(transcript);
    resetTranscript();
    SpeechRecognition.stopListening();
  };

  const handleStart = () => {
    if (!browserSupportsSpeechRecognition) {
      toast({
        title: "Browser does not support speech recognition",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      SpeechRecognition.startListening();
    }
  };

  return (
    <Button
      isDisabled={disabled}
      onClick={listening ? handleStop : handleStart}
    >
      <Image
        src={!listening ? "/icons/mic.svg" : "/icons/stop.svg"}
        alt="microphone"
        w="4"
        h="4"
      />
    </Button>
  );
};

export default SpeechInput;
