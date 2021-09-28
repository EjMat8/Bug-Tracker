import React from "react";
import {
  GridItem,
  Button,
  Heading,
  HStack,
  Avatar,
  Flex,
  Text,
} from "@chakra-ui/react";
import { BsPlus } from "react-icons/bs";
import aImage from "../../assets/img/avatar.jpg";
export const TopBar = () => {
  return (
    <GridItem
      gridColumn="1/-1"
      as={Flex}
      align="center"
      justify="space-between"
    >
      <Heading as="h1" fontWeight="medium " textTransform="uppercase">
        Codeplay
      </Heading>
      <Button
        leftIcon={<BsPlus />}
        borderRadius="full"
        colorScheme="telegram"
        fontSize="xl"
        fontWeight="normal"
        textTransform="uppercase"
        px={8}
        py={6}
      >
        a button
      </Button>
      <HStack spacing={4}>
        <Text fontSize="xl">Eli</Text>
        <Avatar name="Eli" src={aImage} />
      </HStack>
    </GridItem>
  );
};
