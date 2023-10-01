"use client";

import React, { useState } from "react";

import {
  Button,
  Image,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Spinner,
} from "@chakra-ui/react";

import { useMutation } from "@tanstack/react-query";

import { sentimentAnalysis } from "@/services/mailService";

type Props = {
  isDisabled: boolean;
  content: string;
};

const SentimentAnalysis = ({ isDisabled, content }: Props) => {
  const [result, setResult] = useState<string>("");

  const sentimentAnalysisMutation = useMutation((content: string) =>
    sentimentAnalysis(content)
  );

  const handleSentimentAnalysis = async () => {
    const { data } = await sentimentAnalysisMutation.mutateAsync(content);

    setResult(data.tone);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          onClick={handleSentimentAnalysis}
          isLoading={sentimentAnalysisMutation.isLoading}
          bg="none"
          gap="2"
          border="1px solid transparent"
          _hover={{
            border: "1px solid",
            borderImageSlice: 1,
            borderImageSource:
              "linear-gradient(90deg, #FF00A8 0%, #FF7D00 100%)",
          }}
          isDisabled={isDisabled}
        >
          <Image src="/icons/star.svg" alt="start" w="4" h="4" />

          <Text
            bgGradient="linear-gradient(90deg, #FF00A8 0%, #FF7D00 100%)"
            bgClip="text"
            fontSize="sm"
          >
            Sentiment Analysis
          </Text>
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontSize="sm">Sentiment Analysis</PopoverHeader>

        <PopoverBody fontSize="sm">
          {sentimentAnalysisMutation.isLoading ? (
            <Spinner color="primary" />
          ) : (
            <Text>
              The sentiment analysis of the email is{" "}
              <Text fontWeight="semibold">{result}</Text>
            </Text>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SentimentAnalysis;
