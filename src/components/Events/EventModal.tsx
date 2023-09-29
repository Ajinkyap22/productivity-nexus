import React from "react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const EventModal = ({ isOpen, onClose }: Props) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
      <DrawerOverlay />

      <DrawerContent pb="3" pt="6">
        <DrawerCloseButton />

        <DrawerHeader fontSize="2xl" color="blackAlpha.800">
          Create Event
        </DrawerHeader>

        <DrawerBody>
          <Input placeholder="Type here..." />
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={onClose}
            flex={1}
            py="6"
            h="0"
            borderRadius="lg"
          >
            Cancel
          </Button>

          <Button
            bg="primary"
            color="white"
            flex={1}
            py="6"
            h="0"
            borderRadius="lg"
            _hover={{
              bg: "primaryDark",
            }}
          >
            Create
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EventModal;
