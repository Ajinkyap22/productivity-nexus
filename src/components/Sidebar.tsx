"use client";

import React from "react";

import { Button, GridItem, HStack, Image, Text } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { selectIsExpanded, toggleSidebar } from "@/redux/slices/sidebarSlice";
import { AppDispatch } from "@/redux/store";

const Sidebar = () => {
  const isExpanded = useSelector(selectIsExpanded);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <GridItem
      colSpan={isExpanded ? 2 : 1}
      bg="sidebar"
      boxShadow={"0px 0px 4px 0px rgba(0, 0, 0, 0.20)"}
    >
      <HStack alignItems="center" justifyContent="space-between" px="5" py="4">
        <HStack gap="2">
          <Image src="/icons/logo.svg" alt="Nexus" minW="12" minH="12" />

          {isExpanded && (
            <Text fontSize="3xl" fontWeight="medium">
              Nexus
            </Text>
          )}
        </HStack>

        <Button onClick={() => dispatch(toggleSidebar())}>
          <Image
            src={isExpanded ? "/icons/collapse.svg" : "/icons/expand.svg"}
            alt="Nexus"
            minW="4"
            minH="4"
          />
        </Button>
      </HStack>
    </GridItem>
  );
};

export default Sidebar;
