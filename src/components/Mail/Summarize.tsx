"use client";

import React, { useEffect, useState } from "react";

import {
  Button,
  Image,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  FormControl,
  Input,
  HStack,
  FormLabel,
  VStack,
} from "@chakra-ui/react";

import { summarize } from "@/services/mailService";

import { useMutation } from "@tanstack/react-query";

type Props = {
  isDisabled: boolean;
  content: string;
};

const Summarize = ({ isDisabled, content }: Props) => {
  const [result, setResult] = useState<string>("");
  const [numberOfLines, setNumberOfLines] = useState<number>();

  const summarizeMutation = useMutation(
    ({ content, numberOfLines }: { content: string; numberOfLines: number }) =>
      summarize(content, numberOfLines)
  );

  const handleNumberOfLines = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfLines(+e.target.value);
  };

  const handleSummarize = async () => {
    const { data } = await summarizeMutation.mutateAsync({
      content,
      numberOfLines: numberOfLines || 3,
    });

    setResult(data.summary);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button
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
          <Image src="/icons/robot.svg" alt="start" w="4" h="4" />

          <Text
            fontSize="sm"
            bgGradient="linear-gradient(90deg, #FF00A8 0%, #FF7D00 100%)"
            bgClip="text"
          >
            Summarize
          </Text>
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader fontSize="sm">Summarize Mail</PopoverHeader>
        <PopoverCloseButton />

        <PopoverBody as={VStack} gap="3">
          <FormControl>
            <FormLabel fontSize="sm" fontWeight="medium">
              Number of lines to summarize in:
            </FormLabel>

            <Input
              type="number"
              fontSize="sm"
              value={numberOfLines}
              onChange={handleNumberOfLines}
            />
          </FormControl>

          {result && (
            <>
              <Text fontSize="sm" w="full">
                The summarized mail is:
              </Text>

              <Text fontSize="sm" w="full">
                {result}
              </Text>
            </>
          )}
        </PopoverBody>

        <PopoverFooter justifyContent="flex-end" as={HStack}>
          <Button
            isLoading={summarizeMutation.isLoading}
            isDisabled={!numberOfLines}
            onClick={handleSummarize}
            bg="primary"
            color="white"
            fontSize="sm"
            fontWeight="normal"
            _hover={{
              bg: "primaryDark",
            }}
          >
            Summarize
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default Summarize;
