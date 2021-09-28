import React from "react";
import { Grid, GridItem, Text } from "@chakra-ui/react";
const CodeLogPage = () => {
  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(14rem, 1fr))"
      templateRows="repeat(auto-fill,19rem)"
      columnGap={16}
      rowGap={12}
      h="100%"
    >
      <GridItem bgColor="teal.200">
        <Text>Hello</Text>
      </GridItem>
      <GridItem bgColor="teal.200">
        <Text>Hello</Text>
      </GridItem>
    </Grid>
  );
};

export default CodeLogPage;
