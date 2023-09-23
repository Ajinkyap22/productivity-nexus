"use client";

import React from "react";

import { GridItem } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { selectIsExpanded } from "@/redux/slices/sidebarSlice";
import MailSidebar from "@/components/Mail/MailSidebar";

const Mail = () => {
  const isExpanded = useSelector(selectIsExpanded);

  return (
    <GridItem
      colSpan={{
        base: 8,
        xl: isExpanded ? 8 : 9,
      }}
      display="grid"
      gridTemplateColumns="repeat(10, 1fr)"
    >
      {/* sidebar */}
      <MailSidebar />
    </GridItem>
  );
};

export default Mail;
