/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar/Sidebar";

import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";

import { GridItem, Spinner } from "@chakra-ui/react";

import { useMutation } from "@tanstack/react-query";
import { generateToken } from "@/services/userService";

type Props = {
  children: React.ReactNode;
};

const MainContent = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);

  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  const code = useSearchParams().get("code");
  const router = useRouter();
  const pathname = usePathname();

  const generateTokenMutation = useMutation((token: string) =>
    generateToken(token)
  );

  useEffect(() => {
    if (code) {
      generateTokenMutation.mutate(code, {
        onSuccess: (data) => {
          dispatch(setUser(data));
          localStorage.setItem("user", JSON.stringify(data));

          setLoading(false);

          // remove code from url
          router.push("/mail");
        },
      });
    }
  }, [code]);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch(setUser(JSON.parse(user)));

      if (pathname === "/") {
        router.push("/mail");
      }
    } else {
      pathname !== "/" && router.push("/");
    }
  }, []);

  return (
    <>
      {!!code && loading ? (
        <GridItem
          colSpan={{
            base: 9,
            xl: 10,
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner color="primary" size="xl" />
        </GridItem>
      ) : (
        <>
          {pathname !== "/" && <Sidebar />}

          {children}
        </>
      )}
    </>
  );
};

export default MainContent;
