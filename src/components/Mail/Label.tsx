import React from "react";

import { Button, Text } from "@chakra-ui/react";
import LabelIcon from "@/components/IconComponents/LabelIcon";
import { MailSidebarItems } from "@/types/mailSidebarItems";

type Props = {
  color: string;
  label: MailSidebarItems;
  isActive: boolean;
  handleClick: (item: MailSidebarItems) => void;
};

const Label = ({ color, label, isActive, handleClick }: Props) => {
  return (
    <Button
      onClick={() => handleClick(label)}
      bg={isActive ? "green.100" : "transparent"}
      py="0"
      px="1"
      w="full"
      justifyContent="flex-start"
      gap={3}
      _hover={{
        bg: isActive ? "green.100" : "gray.50",
      }}
    >
      <LabelIcon w={24} h={24} color={color} />

      <Text color="trueGray.200" fontSize="sm" fontWeight="semibold">
        {label}
      </Text>
    </Button>
  );
};

export default Label;
