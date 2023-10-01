"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import {
  GridItem,
  HStack,
  VStack,
  Text,
  Button,
  Image,
  Avatar,
  useToast,
  Toast,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { selectActiveMail } from "@/redux/slices/mailSlice";
import { selectUser } from "@/redux/slices/userSlice";

import { AllMail, Mail } from "@/types/Mail";

import moment from "moment";
import { useMutation } from "@tanstack/react-query";

import StarIcon from "@/components/IconComponents/StarIcon";

import { starMail } from "@/services/mailService";

const MailDetails = () => {
  const [starred, setStarred] = useState(false);

  // TODO: add logic get user's starred mails and check if active mail is starred

  const activeMail: AllMail | null = useSelector(selectActiveMail);
  const user = useSelector(selectUser);

  const toast = useToast();

  const startMailMutation = useMutation(
    ({ userEmail, starredMail }: { userEmail: string; starredMail: AllMail }) =>
      starMail(userEmail, starredMail)
  );

  const router = useRouter();

  const handleBack = () => {
    router.push("/mail");
  };

  const handleStar = () => {
   

    startMailMutation.mutate(
      {
        userEmail: user?.email!,
        starredMail: activeMail!,
      },
      {
        onSuccess: () => {
          setStarred(true);

          toast({
            title: "Mail starred successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
            containerStyle: {
              marginTop: "1rem",
            },
          });
        },
      }
    );
  };

  return (
    <GridItem
      colSpan={{
        base: 7,
        xl: 8,
      }}
      boxShadow="0px 0px 4px 0px rgba(0, 0, 0, 0.25)"
      my="4"
      borderRadius="lg"
      as={VStack}
    >
      {/* subject */}
      <HStack w="full" p="4" alignItems="center" gap="2">
        <Button bg="none" p="0" w="0" onClick={handleBack}>
          <Image src="/icons/back.svg" alt="" w="5" h="5" />
        </Button>

        <Text fontSize="lg">{activeMail?.subject}</Text>
      </HStack>

      <HStack w="full" px="5" justifyContent="space-between">
        {/* sender */}
        <HStack gap="3">
          <Avatar
            size="sm"
            name={activeMail?.sentBy[0].name || activeMail?.sentBy[0].email}
          />

          <HStack>
            <Text>
              {activeMail?.sentBy[0].name || activeMail?.sentBy[0].email}
            </Text>

            <Text fontSize="xs">&lt;{activeMail?.sentBy[0].email}&gt;</Text>
          </HStack>
        </HStack>

        {/* date */}
        <HStack alignItems="center" gap="4">
          <Text fontSize="xs">
            {moment(activeMail?.date).format("MMM DD, YYYY hh:mm A")}
          </Text>

          <Button
            onClick={handleStar}
            isLoading={startMailMutation.isLoading}
            bg="blackAlpha.100"
            w="0"
            p="0"
            h="9"
          >
            <StarIcon w={18} h={18} isStarred={starred} />
          </Button>
        </HStack>
      </HStack>

      {/* body */}
      <VStack w="full" px="5" py="4" alignItems="flex-start">
        <Text
          fontSize="sm"
          w="full"
          dangerouslySetInnerHTML={{ __html: activeMail?.body! }}
        />
      </VStack>
    </GridItem>
  );
};

export default MailDetails;
