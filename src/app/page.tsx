"use client";

import { useEffect, useRef, useState } from "react";

import {
  GridItem,
  VStack,
  Text,
  FormControl,
  Input,
  Button,
  Image,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";

import { validateEmail } from "@/utils/validateEmail";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const toast = useToast();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && validateEmail(email)) {
      handleSubmit();
    }

    return;
  };

  const handleSubmit = async () => {
    try {
      const body = {
        email_address: email,
      };

      const response = await axios.post(
        `${API_URL}/nylas/generate-auth-url`,
        body
      );

      const authURLFromNylas = response.data;

      localStorage.setItem("signInEmail", email);
      window.location.href = authURLFromNylas;

      // clear email input
      setEmail("");
    } catch (error) {
      toast({
        title: "There was an error, please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        containerStyle: {
          marginTop: "1rem",
        },
      });
    }
  };

  return (
    <GridItem
      colSpan={12}
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      <VStack gap={8} borderRadius="md" p="12" shadow="base">
        <VStack>
          <Image src="/icons/logo.svg" alt="logo" w="12" h="12" />

          <Text fontSize="2xl" fontWeight="medium" color="blackAlpha.800">
            Sign In to Productivity Nexus
          </Text>
        </VStack>

        <FormControl w="full">
          <Input
            ref={inputRef}
            type="email"
            onChange={handleEmailChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter your email address"
            fontSize="sm"
          />
        </FormControl>

        <Button
          onClick={handleSubmit}
          isDisabled={!validateEmail(email)}
          bg="primary"
          color="white"
          w="full"
          _hover={{
            bg: "primaryDark",
          }}
          _disabled={{
            opacity: 0.6,
            cursor: "default",
          }}
        >
          Sign In
        </Button>
      </VStack>
    </GridItem>
  );
}
