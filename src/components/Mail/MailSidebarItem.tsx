import React, { useCallback } from "react";

import { Button, HStack, Text } from "@chakra-ui/react";

import InboxIcon from "@/components/IconComponents/InboxIcon";
import SentIcon from "@/components/IconComponents/SentIcon";
import FavoritesIcon from "@/components/IconComponents/FavoritesIcon";
import DraftsIcon from "@/components/IconComponents/DraftsIcon";
import ScheduledIcon from "@/components/IconComponents/ScheduledIcon";
import MoreIcon from "@/components/IconComponents/MoreIcon";

import { MailSidebarItems } from "@/types/mailSidebarItems";

type Props = {
  item: MailSidebarItems;
  Icon: React.JSX.Element | null;
  isActive: boolean;
  handleClick: (item: MailSidebarItems) => void;
};

const MailSidebarItem = ({ item, Icon, isActive, handleClick }: Props) => {
  return (
    <Button
      onClick={() => handleClick(item)}
      w="full"
      bg="transparent"
      justifyContent="space-between"
      px="2"
      _hover={{
        bg: "green.50",
      }}
    >
      <HStack gap={4}>
        {Icon}

        <Text
          color={isActive ? "primary" : "trueGray.200"}
          fontSize="sm"
          fontWeight="semibold"
        >
          {item}
        </Text>
      </HStack>
    </Button>
  );
};

export default MailSidebarItem;
