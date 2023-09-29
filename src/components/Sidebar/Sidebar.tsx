/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useCallback, useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import {
  Button,
  GridItem,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { selectIsExpanded, toggleSidebar } from "@/redux/slices/sidebarSlice";

import SidebarItem from "@/components/Sidebar/SidebarItem";
import UserDetails from "@/components/Sidebar/UserDetails";
import MailIcon from "@/components/IconComponents/MailIcon";
import CalendarIcon from "@/components/IconComponents/CalendarIcon";
import EventsIcon from "@/components/IconComponents/EventsIcon";
import AnalyticsIcon from "@/components/IconComponents/AnalyticsIcon";
import ThemeIcon from "@/components/IconComponents/ThemeIcon";

import { sidebarItems } from "@/data/sidebarItems";

import { SidebarItems } from "@/types/sidebarItems";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<SidebarItems>(SidebarItems.MAIL);

  const isExpanded = useSelector(selectIsExpanded);

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const currentActiveItem = sidebarItems.find(
      (item) => item.item.toLowerCase() === pathname.substring(1)
    );

    if (currentActiveItem) {
      setActiveItem(currentActiveItem.item as SidebarItems);
    }
  }, []);

  const handleItemClick = (item: SidebarItems) => {
    setActiveItem(item);
    router.push(`/${item.toLowerCase()}`);
  };

  const Icon = useCallback(
    (item: SidebarItems) => {
      switch (item) {
        case SidebarItems.MAIL:
          return (
            <MailIcon
              w={24}
              h={24}
              color={activeItem === SidebarItems.MAIL ? "#2FAC85" : "#566164"}
            />
          );
        case SidebarItems.CALENDAR:
          return (
            <CalendarIcon
              w={24}
              h={24}
              color={
                activeItem === SidebarItems.CALENDAR ? "#2FAC85" : "#566164"
              }
            />
          );
        case SidebarItems.EVENTS:
          return (
            <EventsIcon
              w={24}
              h={24}
              color={activeItem === SidebarItems.EVENTS ? "#2FAC85" : "#566164"}
            />
          );
        case SidebarItems.ANALYTICS:
          return (
            <AnalyticsIcon
              w={24}
              h={24}
              color={
                activeItem === SidebarItems.ANALYTICS ? "#2FAC85" : "#566164"
              }
            />
          );
        case SidebarItems.THEME:
          return (
            <ThemeIcon
              w={24}
              h={24}
              color={activeItem === SidebarItems.THEME ? "#2FAC85" : "#566164"}
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
              Icon={Icon(item.item as SidebarItems)}
              isExpanded={isExpanded}
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
