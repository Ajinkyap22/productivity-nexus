import React from "react";

import { Avatar, Button, HStack, Image, Text } from "@chakra-ui/react";

type Props = {
  isExpanded: boolean;
};

const UserDetails = ({ isExpanded }: Props) => {
  return (
    <HStack alignItems="center" p="4" gap="3" justifySelf="flex-end">
      {/* profile picture */}
      <Avatar
        src="https://memetemplate.in/uploads/1641347298.jpeg"
        name="User"
        size="sm"
      />

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
          Ajinkya Palaskar
        </Text>
      )}

      {/* logout */}
      <Button w="0">
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
