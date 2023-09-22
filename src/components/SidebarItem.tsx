import React from "react";

import { Button, Image, Text } from "@chakra-ui/react";

import { SidebarItems } from "@/types/sidebarItems";

type Props = {
  item: SidebarItems;
  isExpanded: boolean;
  iconPath: string;
  activeIconPath: string;
  isActive: boolean;
  handleClick: (item: SidebarItems) => void;
};

const SidebarItem = ({
  item,
  isExpanded,
  iconPath,
  activeIconPath,
  isActive,
  handleClick,
}: Props) => {
  return (
    <Button
      onClick={() => handleClick(item)}
      display="flex"
      alignItems="center"
      justifyContent={{
        base: "center",
        lg: "flex-start",
      }}
      gap="3"
      h="0"
      p="4"
      py="6"
      borderRadius="2xl"
      w={isExpanded ? "full" : "auto"}
      bg={isActive ? "white" : "transparent"}
      boxShadow={isActive ? "0px 3px 3px 0px rgba(0, 0, 0, 0.25)" : "none"}
      _hover={{
        bg: isActive ? "white" : "gray.200",
      }}
    >
      {/* icon */}
      <Image
        src={isActive ? activeIconPath : iconPath}
        alt={item}
        minW="8"
        minH="8"
        w="8"
        h="8"
      />

      {/* text */}
      {isExpanded && (
        <Text
          fontSize="xl"
          fontWeight="normal"
          color={isActive ? "primary" : "trueGray"}
          display={{
            base: "none",
            lg: "block",
          }}
        >
          {item}
        </Text>
      )}
    </Button>
  );
};

export default SidebarItem;
