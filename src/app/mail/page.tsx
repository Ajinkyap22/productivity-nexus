"use client";

import React from "react";

import { useSelector } from "react-redux";
import { selectActiveItem } from "@/redux/slices/sidebarSlice";

import MailList from "@/components/Mail/MailList";

const Mail = () => {
  const activeItem = useSelector(selectActiveItem);

  return <MailList activeItem={activeItem} />;
};

export default Mail;
