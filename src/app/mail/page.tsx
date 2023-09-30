"use client";

import React, { useState } from "react";

import { GridItem } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { selectIsExpanded } from "@/redux/slices/sidebarSlice";
import MailSidebar from "@/components/Mail/MailSidebar";
import { MailSidebarItems } from "@/types/mailSidebarItems";
import MailList from "@/components/Mail/MailList";

const Mail = () => {
  const isExpanded = useSelector(selectIsExpanded);

  const [activeItem, setActiveItem] = useState<MailSidebarItems>(
    MailSidebarItems.INBOX
  );

  const handleActiveItem = (item: MailSidebarItems) => {
    setActiveItem(item);
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
    >
      {/* sidebar */}
      <MailSidebar activeItem={activeItem} handleClick={handleActiveItem} />

      {/* mail */}
      <MailList activeItem={activeItem} />
    </GridItem>
  );
};

export default Mail;
