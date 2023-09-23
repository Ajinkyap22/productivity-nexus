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
import DraftsIcon from "@/components/IconComponents/DraftsIcon";
import ScheduledIcon from "@/components/IconComponents/ScheduledIcon";
import MoreIcon from "@/components/IconComponents/MoreIcon";
import Label from "@/components/Mail/Label";

import { MailSidebarItems } from "@/types/mailSidebarItems";

const MailSidebar = () => {
  const [activeItem, setActiveItem] = useState<MailSidebarItems>(
    MailSidebarItems.INBOX
  );

  const handleActiveItem = (item: MailSidebarItems) => {
    if (item === MailSidebarItems.MORE) return;

    setActiveItem(item);
  };

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
        case "Favorites":
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
        case "Drafts":
          return (
            <DraftsIcon
              w={22}
              h={22}
              color={activeItem === item ? "#2FAC85" : "#777777"}
            />
          );
        case "More":
          return (
            <MoreIcon
              w={22}
              h={22}
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
    >
      {/* new mail button */}
      <Button
        w="full"
        bg="primary"
        borderRadius="lg"
        justifyContent="flex-start"
        gap={4}
        _hover={{
          bg: "primary",
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
            handleClick={handleActiveItem}
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
        <Button
          p="0"
          bg="transparent"
          _hover={{
            bg: "green.50",
          }}
        >
          <Image src="/icons/plus-circle.svg" alt="new label" w="6" h="6" />
        </Button>
      </HStack>

      <VStack gap={2} mt={2}>
        <Label color="#FD3D00" label="Work" />

        <Label color="#00BEFA" label="Personal" />

        <Label color="#13C58D" label="Newsletters" />
      </VStack>
    </GridItem>
  );
};

export default MailSidebar;
