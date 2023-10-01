import React from "react";

import { useRouter } from "next/navigation";

import { Avatar, Button, HStack, Image, Text } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";

type Props = {
  isExpanded: boolean;
};

const UserDetails = ({ isExpanded }: Props) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(setUser(null));

    router.push("/");
  };

  return (
    <HStack alignItems="center" p="4" gap="3" justifySelf="flex-end">
      {/* profile picture */}
      <Avatar name={user?.name} size="sm" />

      {/* name */}
      {isExpanded && (
        <Text
          fontSize="md"
          fontWeight="normal"
          display={{
            base: "none",
            lg: "block",
          }}
          isTruncated
        >
          {user?.name}
        </Text>
      )}

      {/* logout */}
      <Button w="0" onClick={handleLogout}>
        <Image
          src="/icons/logout.svg"
          alt="Logout"
          minW="5"
          minH="5"
          w="5"
          h="5"
        />
      </Button>
    </HStack>
  );
};

export default UserDetails;
