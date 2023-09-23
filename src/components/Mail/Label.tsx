import React from "react";

import { Button, Text } from "@chakra-ui/react";
import LabelIcon from "@/components/IconComponents/LabelIcon";

type Props = {
  color: string;
  label: string;
};

const Label = ({ color, label }: Props) => {
  return (
    <Button
      bg="transparent"
      py="0"
      px="1"
      w="full"
      justifyContent="flex-start"
      gap={3}
      _hover={{
        bg: "gray.50",
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
