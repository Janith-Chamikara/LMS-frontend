import { FC } from "react";
import { Box, Flex, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import Navigation from "./Navigation";
import { panalItems } from "../assests/panelItems";
import {
  FcPositiveDynamic,
  FcBearish,
  FcNegativeDynamic,
} from "react-icons/fc";
import ChartCard from "./ChartCard";
import { data } from "../assests/chartCardsData";

const AdminPanel: FC = () => {
  const backgroundColor = useColorModeValue("gray.100", "gray.900");
  return (
    <Flex
      direction={"row"}
      marginTop={"10px"}
      maxWidth={"97vw"}
      mx={"auto"}
      gap={"10px"}
      height={"max-content"}
    >
      <Box
        width={"max-content"}
        height={"63vh"}
        borderRight={"1px"}
        borderRightColor={"gray.500"}
      >
        <Navigation items={panalItems} />
      </Box>
      <Grid
        width={"100%"}
        borderRadius={"lg"}
        templateColumns={"repeat(4,1fr)"}
        gap={"10px"}
        gridAutoRows={"minmax(200px,auto)"}
      >
        <GridItem
          borderRadius={"lg"}
          bgColor={backgroundColor}
          gridRow={"span 3"}
        ></GridItem>
        <GridItem borderRadius={"lg"} bgColor={backgroundColor}>
          <ChartCard
            title="Users"
            count={53}
            percentage={66.5}
            chartData={data}
            dataKey="pv"
          >
            <FcPositiveDynamic />
          </ChartCard>
        </GridItem>
        <GridItem borderRadius={"lg"} bgColor={backgroundColor}></GridItem>
        <GridItem
          borderRadius={"lg"}
          bgColor={backgroundColor}
          gridRow={"span 3"}
        ></GridItem>
        <GridItem borderRadius={"lg"} bgColor={backgroundColor}>
          <ChartCard
            title="Courses"
            count={83}
            percentage={26.5}
            chartData={data}
            dataKey="pv"
          >
            <FcNegativeDynamic />
          </ChartCard>
        </GridItem>
        <GridItem borderRadius={"lg"} bgColor={backgroundColor}></GridItem>
        <GridItem
          bgColor={backgroundColor}
          borderRadius={"lg"}
          gridColumn={"span 2"}
          gridRow={"span 2"}
        ></GridItem>

        <GridItem bgColor={backgroundColor} borderRadius={"lg"}></GridItem>
        <GridItem bgColor={backgroundColor} borderRadius={"lg"}></GridItem>
      </Grid>
    </Flex>
  );
};

export default AdminPanel;
