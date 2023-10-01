"use client";

import React, { useCallback } from "react";

import { GridItem, HStack, Spinner, VStack, Text } from "@chakra-ui/react";

import { MailSidebarItems } from "@/types/mailSidebarItems";
import { AllMail } from "@/types/Mail";

import {
  getLabelMail,
  getMail,
  getScheduledMail,
  getSentMail,
  getSpamMail,
  getStarredMail,
  getTrashMail,
} from "@/services/mailService";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";
import { setActiveMail } from "@/redux/slices/mailSlice";

import { useQuery } from "@tanstack/react-query";

import moment from "moment";
import { useRouter } from "next/navigation";

type Props = {
  activeItem: MailSidebarItems;
};

const MailList = ({ activeItem }: Props) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const getQueryFunction = useCallback(() => {
    if (!user) return () => {};

    switch (activeItem) {
      case MailSidebarItems.INBOX:
        return getMail(user.email);
      case MailSidebarItems.SENT:
        return getSentMail(user.email);
      case MailSidebarItems.STARRED:
        return getStarredMail(user.email);
      case MailSidebarItems.SCHEDULED:
        return getScheduledMail(user.email);
      case MailSidebarItems.TRASH:
        return getTrashMail(user.email);
      case MailSidebarItems.SPAM:
        return getSpamMail(user.email);
      case MailSidebarItems.PERSONAL:
        return getLabelMail(user.email, MailSidebarItems.PERSONAL);
      case MailSidebarItems.SOCIAL:
        return getLabelMail(user.email, MailSidebarItems.SOCIAL);
      case MailSidebarItems.PROMOTIONS:
        return getLabelMail(user.email, MailSidebarItems.PROMOTIONS);
      default:
        return getMail(user.email);
    }
  }, [user, activeItem]);

  const { data, isLoading } = useQuery([activeItem], () => getQueryFunction(), {
    enabled: !!user,
  });

  const handleClick = (mail: AllMail) => {
    dispatch(setActiveMail(mail));
    localStorage.setItem("activeMail", JSON.stringify(mail));

    router.push(`/mail/${mail.ID}`);
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
    >
      {isLoading ? (
        <HStack justifyContent="center" alignItems="center" h="96vh">
          <Spinner size="lg" color="primary" />
        </HStack>
      ) : (
        <VStack gap="0">
          {data.map((mail: AllMail) => (
            <HStack
              key={mail.ID}
              w="full"
              py="3"
              px="4"
              borderBottomWidth="thin"
              bg={mail.unread ? "blackAlpha.50" : "whiteAlpha.200"}
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gap="4"
              cursor="pointer"
              _hover={{
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
              onClick={() => handleClick(mail)}
            >
              {/* sender */}
              <GridItem colSpan={3}>
                <Text
                  fontSize="sm"
                  isTruncated
                  fontWeight={mail.unread ? "semibold" : "normal"}
                >
                  {mail.sentBy.map((sentBy) => sentBy.name).join(", ")}
                </Text>
              </GridItem>

              {/* subject */}
              <GridItem colSpan={8}>
                <Text
                  fontSize="sm"
                  isTruncated
                  fontWeight={mail.unread ? "semibold" : "normal"}
                >
                  {mail.subject}
                </Text>
              </GridItem>

              {/* date */}
              <GridItem colSpan={1}>
                <Text
                  fontSize="xs"
                  isTruncated
                  fontWeight={mail.unread ? "semibold" : "normal"}
                  textAlign="center"
                >
                  {moment(mail.date).isSame(moment(), "day")
                    ? moment(mail.date).format("LT")
                    : moment(mail.date).format("ll")}
                </Text>
              </GridItem>
            </HStack>
          ))}

          {!data.length && (
            <Text
              isTruncated
              fontWeight="normal"
              textAlign="center"
              py="4"
              color="trueGray"
            >
              Nothing to see here
            </Text>
          )}
        </VStack>
      )}
    </GridItem>
  );
};

export default MailList;
