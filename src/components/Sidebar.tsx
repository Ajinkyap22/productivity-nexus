"use client";

import React, { useState } from "react";

import {
  Button,
  GridItem,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { selectIsExpanded, toggleSidebar } from "@/redux/slices/sidebarSlice";
import { AppDispatch } from "@/redux/store";

import SidebarItem from "@/components/SidebarItem";

import { sidebarItems } from "@/data/sidebarItems";

import { SidebarItems } from "@/types/sidebarItems";
import UserDetails from "./UserDetails";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<SidebarItems>(SidebarItems.MAIL);

  const isExpanded = useSelector(selectIsExpanded);
  const dispatch = useDispatch<AppDispatch>();

  const handleItemClick = (item: SidebarItems) => {
    setActiveItem(item);
  };

  return (
    <GridItem
      colSpan={{
        base: 1,
        xl: isExpanded ? 2 : 1,
      }}
      h="100vh"
      bg="sidebar"
      boxShadow={"0px 0px 4px 0px rgba(0, 0, 0, 0.20)"}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <VStack>
        {/* title */}
        <HStack
          alignItems="center"
          justifyContent={{
            base: "center",
            lg: "space-between",
          }}
          p="4"
          w="full"
        >
          <HStack gap="2">
            <Image
              src="/icons/logo.svg"
              alt="Nexus"
              w={{
                base: "10",
                xl: "12",
              }}
              h={{
                base: "10",
                xl: "12",
              }}
            />

            {isExpanded && (
              <Text
                fontSize={{
                  base: "2xl",
                  xl: "3xl",
                }}
                display={{
                  base: "none",
                  lg: "block",
                }}
                fontWeight="medium"
              >
                Nexus
              </Text>
            )}
          </HStack>

          <Button
            onClick={() => dispatch(toggleSidebar())}
            w="0"
            display={{
              base: "none",
              lg: "flex",
            }}
          >
            <Image
              src={isExpanded ? "/icons/collapse.svg" : "/icons/expand.svg"}
              alt="Nexus"
              minW="4"
              minH="4"
              w="4"
              h="4"
            />
          </Button>
        </HStack>

        {/* menu */}
        <VStack px="4" mt="8" gap="6" w="full">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              item={item.item as SidebarItems}
              isExpanded={isExpanded}
              iconPath={item.iconPath}
              activeIconPath={item.activeIconPath}
              isActive={activeItem === item.item}
              handleClick={handleItemClick}
            />
          ))}
        </VStack>
      </VStack>

      {/* TODO - integrate actual user details once auth is setup */}
      {/* user details & logout */}
      <UserDetails isExpanded={isExpanded} />
    </GridItem>
  );
};

export default Sidebar;
