import React from "react";
import { TopBar } from "./TopBar";
import { SideBar } from "./SideBar";
import faker from "faker";
import {
  Grid,
  GridItem,
  Text,
  VStack,
  Image,
  Box,
  Heading,
  Tag,
  HStack,
  Code,
} from "@chakra-ui/react";

const Layout = ({ children: content }) => {
  return (
    <Grid
      templateRows="7rem 1fr"
      templateColumns="15rem 1fr"
      bgColor="bgColor"
      h="100vh"
      borderRadius="lg"
      boxShadow="lg"
      px={20}
      pt={4}
    >
      <TopBar />
      <SideBar />
      <GridItem>
        <Grid
          templateColumns="repeat(auto-fill, minmax(13rem,15rem))"
          templateRows="repeat(auto-fill,19rem)"
          columnGap={12}
          rowGap={8}
          pt={8}
          h="100%"
        >
          <GridItem
            bgColor="whiteAlpha.900"
            borderRadius="lg"
            as={VStack}
            boxShadow="md"
            cursor="pointer"
            alignItems="start"
            p={4}
          >
            <Box h="70%" mb={2}>
              <Image
                h="100%"
                objectFit="cover"
                alt="some image"
                src={faker.image.food()}
              />
            </Box>
            <HStack>
              <Code>day = 3;</Code>
              <Tag size="sm" borderRadius="full" colorScheme="green">
                MongoDB
              </Tag>
            </HStack>
            <Text fontSize="xs">September 21, 2021</Text>
            <Heading size="md">Making a schema</Heading>
          </GridItem>
          <GridItem
            bgColor="whiteAlpha.900"
            borderRadius="lg"
            as={VStack}
            boxShadow="md"
            cursor="pointer"
            alignItems="start"
            p={4}
          >
            <Box h="70%" mb={2}>
              <Image
                h="100%"
                objectFit="cover"
                alt="some image"
                src={faker.image.food()}
              />
            </Box>
            <HStack>
              <Code>day = 2;</Code>
              <Tag size="sm" borderRadius="full" colorScheme="green">
                MongoDB
              </Tag>
            </HStack>
            <Text fontSize="xs">September 21, 2021</Text>
            <Heading size="md">Making a schema</Heading>
          </GridItem>
          <GridItem
            bgColor="whiteAlpha.900"
            borderRadius="lg"
            as={VStack}
            boxShadow="md"
            cursor="pointer"
            alignItems="start"
            p={4}
          >
            <Box h="70%" mb={2}>
              <Image
                h="100%"
                objectFit="cover"
                alt="some image"
                src={faker.image.food()}
              />
            </Box>
            <HStack>
              <Code>let day = 1;</Code>
              <Tag size="sm" borderRadius="full" colorScheme="green">
                MongoDB
              </Tag>
            </HStack>
            <Text fontSize="xs">September 21, 2021</Text>
            <Heading size="md">Making a schema</Heading>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default Layout;
// <Box bgColor="bgColor" h="100vh">
//       <Container maxW="container.lg" pt={16} h="100%" bgColor="yellow">
//         <HStack
//           alignItems="flex-end"
//           spacing={3}
//           justify="space-between"
//           px={10}
//         >
// <Heading as="h1">Codeplay</Heading>
// <Button
//   leftIcon={<BsPlus />}
//   borderRadius="full"
//   colorScheme="messenger"
//   fontSize="xl"
//   fontWeight="normal"
//   textTransform="uppercase"
// >
//   Make
// </Button>
// <HStack spacing={4}>
//   <Text fontSize="xl">Eli</Text>
//   <Avatar name="Eli" src={aImage} />
// </HStack>
//         </HStack>
//         <Flex>
//           <Flex
//             as="nav"
//             flexDir="column"
//             bgColor="red"
//             flexBasis="25%"
//             alignItems="center"
//           >
//             <Heading as="h3" size="sm">
//               Playgrounds
//             </Heading>
//             <VStack>
//               <Link>#100DaysOfCode</Link>
//               <Link>Playground 2</Link>
//               <Link>Playground 3</Link>
//               <Link>Playground 4</Link>
//             </VStack>
//           </Flex>

//           <Grid>{children}</Grid>
//         </Flex>
//       </Container>
//     </Box>
