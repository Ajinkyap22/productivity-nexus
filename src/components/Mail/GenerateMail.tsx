import React from "react";

import { Button, Text } from "@chakra-ui/react";
import { ChatRequestOptions } from "ai";

type Props = {
  isLoading: boolean;
  isDisabled: boolean;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
};

const GenerateMail = ({ isLoading, isDisabled, handleSubmit }: Props) => {
  return (
    <form onSubmit={handleSubmit}>
      <Button
        type="submit"
        isDisabled={isDisabled}
        isLoading={isLoading}
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
    </form>
  );
};

export default GenerateMail;
