"use client";
import "regenerator-runtime/runtime";

import React, { useEffect, useState } from "react";

import { GridItem } from "@chakra-ui/react";

import MailSidebar from "@/components/Mail/MailSidebar";
const EmailForm = dynamic(() => import("@/components/Mail/EmailForm"));

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
import dynamic from "next/dynamic";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const isExpanded = useSelector(selectIsExpanded);
  const activeItem = useSelector(selectActiveItem);

  const [showEmailForm, setShowEmailForm] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const activeMail = JSON.parse(localStorage.getItem("activeMail") || "{}");

    dispatch(setActiveMail(activeMail));
  }, [dispatch]);

  const handleActiveItem = (item: MailSidebarItems) => {
    dispatch(setActiveItem(item));

    if (pathname !== "/mail") {
      router.push("/mail");
    }
  };

  const toggleMailForm = () => {
    setShowEmailForm(!showEmailForm);
  };

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
      <MailSidebar
        activeItem={activeItem}
        handleClick={handleActiveItem}
        openMailForm={toggleMailForm}
      />

      {children}

      {/* email form */}
      {showEmailForm && <EmailForm handleClose={toggleMailForm} />}
    </GridItem>
  );
};

export default Layout;
