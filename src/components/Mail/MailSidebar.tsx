import React, { useCallback, useState } from "react";

import {
  Button,
  Divider,
  GridItem,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import { mailSidebarItems } from "@/data/mailSidebarItems";

import MailSidebarItem from "@/components/Mail/MailSidebarItem";
import InboxIcon from "@/components/IconComponents/InboxIcon";
import SentIcon from "@/components/IconComponents/SentIcon";
import FavoritesIcon from "@/components/IconComponents/FavoritesIcon";
import TrashIcon from "@/components/IconComponents/TrashIcon";
import ScheduledIcon from "@/components/IconComponents/ScheduledIcon";
import SpamIcon from "@/components/IconComponents/SpamIcon";
import Label from "@/components/Mail/Label";

import { MailSidebarItems } from "@/types/mailSidebarItems";

type Props = {
  activeItem: MailSidebarItems;
  handleClick: (item: MailSidebarItems) => void;
  openMailForm: () => void;
};

const MailSidebar = ({ activeItem, handleClick, openMailForm }: Props) => {
  const Icon = useCallback(
    (item: MailSidebarItems) => {
      switch (item) {
        case "Inbox":
          return (
            <InboxIcon
              w={22}
              h={22}
              color={activeItem === item ? "#2FAC85" : "#777777"}
            />
          );
        case "Sent Mail":
          return (
            <SentIcon
              w={22}
              h={22}
              color={activeItem === item ? "#2FAC85" : "#777777"}
            />
          );
        case "Starred":
          return (
            <FavoritesIcon
              w={22}
              h={22}
              color={activeItem === item ? "#2FAC85" : "#777777"}
            />
          );
        case "Scheduled":
          return (
            <ScheduledIcon
              w={22}
              h={22}
              color={activeItem === item ? "#2FAC85" : "#777777"}
            />
          );
        case "Trash":
          return (
            <TrashIcon
              w={18}
              h={18}
              color={activeItem === item ? "#2FAC85" : "#777777"}
            />
          );
        case "Spam":
          return (
            <SpamIcon
              w={18}
              h={18}
              color={activeItem === item ? "#2FAC85" : "#777777"}
            />
          );
        default:
          return null;
      }
    },
    [activeItem]
  );

  return (
    <GridItem
      colSpan={{
        base: 3,
        xl: 2,
      }}
      borderWidth={1}
      my={4}
      bg="white"
      borderRadius="xl"
      boxShadow="0px 0px 4px 0px rgba(0, 0, 0, 0.25)"
      p="3"
      h="96vh"
      position="sticky"
      top="3"
    >
      {/* new mail button */}
      <Button
        onClick={openMailForm}
        w="full"
        bg="primary"
        borderRadius="lg"
        justifyContent="flex-start"
        gap={4}
        _hover={{
          bg: "primaryDark",
        }}
      >
        <Image src="/icons/plus.svg" alt="new mail" w="5" h="5" />

        <Text color="white" size="md" fontWeight="normal">
          New Mail
        </Text>
      </Button>

      {/* divider */}
      <Divider my={4} />

      {/* primary menu */}
      <VStack gap={3}>
        {mailSidebarItems.map((item, index) => (
          <MailSidebarItem
            key={index}
            item={item}
            Icon={Icon(item)}
            isActive={item === activeItem}
            handleClick={handleClick}
          />
        ))}
      </VStack>

      {/* divider */}
      <Divider mt="6" mb="4" />

      {/* TODO: integrate real labels once BE is done */}
      {/* labels */}
      <HStack justifyContent="space-between">
        <Text color="trueGray.200" size="md" fontWeight="semibold">
          Labels
        </Text>
      </HStack>

      <VStack gap={2} mt={2}>
        <Label
          color="#FD3D00"
          label={MailSidebarItems.PERSONAL}
          isActive={activeItem === MailSidebarItems.PERSONAL}
          handleClick={handleClick}
        />

        <Label
          color="#00BEFA"
          label={MailSidebarItems.SOCIAL}
          isActive={activeItem === MailSidebarItems.SOCIAL}
          handleClick={handleClick}
        />

        <Label
          color="#13C58D"
          label={MailSidebarItems.PROMOTIONS}
          isActive={activeItem === MailSidebarItems.PROMOTIONS}
          handleClick={handleClick}
        />
      </VStack>
    </GridItem>
  );
};

export default MailSidebar;
