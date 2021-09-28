import React from "react";
import { GridItem, Text, VStack, Box, Link } from "@chakra-ui/react";
export const SideBar = () => {
  return (
    <GridItem color="grayCustom">
      <Text color="brown" mb={7} fontSize="sm" textTransform="uppercase">
        Playgrounds
      </Text>
      <VStack flexDir="column" align="flex-start" spacing={5}>
        <Box
          transform="scale(1.05)"
          px={4}
          py={2}
          boxShadow="md"
          borderRadius="lg"
          bgColor="whiteAlpha.900"
        >
          <Link color="blackAlpha.800">100DaysOfCode</Link>
        </Box>
        <Link>Playground2</Link>
        <Link>Playground3</Link>
        <Link>Playground4</Link>
      </VStack>
    </GridItem>
  );
};
