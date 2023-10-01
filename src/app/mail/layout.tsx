"use client";

import React, { useEffect } from "react";

import { GridItem } from "@chakra-ui/react";

import MailSidebar from "@/components/Mail/MailSidebar";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  selectActiveItem,
  selectIsExpanded,
  setActiveItem,
} from "@/redux/slices/sidebarSlice";

import { MailSidebarItems } from "@/types/mailSidebarItems";
import { usePathname, useRouter } from "next/navigation";
import { setActiveMail } from "@/redux/slices/mailSlice";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const isExpanded = useSelector(selectIsExpanded);
  const activeItem = useSelector(selectActiveItem);

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const pathname = usePathname();

  const handleActiveItem = (item: MailSidebarItems) => {
    dispatch(setActiveItem(item));

    if (pathname !== "/mail") {
      router.push("/mail");
    }
  };

  useEffect(() => {
    const activeMail = JSON.parse(localStorage.getItem("activeMail") || "{}");

    dispatch(setActiveMail(activeMail));
  }, [dispatch]);

  return (
    <GridItem
      colSpan={{
        base: 8,
        xl: isExpanded ? 8 : 9,
      }}
      display="grid"
      gridTemplateColumns="repeat(10, 1fr)"
      gap="5"
      pr="4"
      alignItems="flex-start"
    >
      {/* sidebar */}
      <MailSidebar activeItem={activeItem} handleClick={handleActiveItem} />

      {/* pass props to children */}

      {children}
    </GridItem>
  );
};

export default Layout;
