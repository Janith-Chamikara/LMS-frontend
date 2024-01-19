import { FC } from "react";
import { Box, Flex, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import Navigation from "./Navigation";
import { panalItems } from "../assests/panelItems";
import { FcPositiveDynamic, FcNegativeDynamic } from "react-icons/fc";
import ChartCard from "./ChartCard";
import { data, pieChartData } from "../assests/chartCardsData";
import BarChartComponent from "./BarChart";
import CustomPieChart from "./CustomPieChart";
import CustomAreaChart from "./CustomAreaChart";

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
          className="tw-shadow-[4px_4px_5px_0px_#38b2ac]"
          borderRadius={"lg"}
          bgColor={backgroundColor}
          gridRow={"span 2"}
        >
          <Box width={"100%"} height={"100%"} padding={"20px"}>
            <BarChartComponent
              title="Total Income"
              data={data}
              barColor="#008AD8 "
            />
          </Box>
        </GridItem>
        <GridItem
          borderRadius={"lg"}
          className="tw-shadow-[4px_4px_5px_0px_#38b2ac]"
          bgColor={backgroundColor}
        >
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
        <GridItem
          borderRadius={"lg"}
          className="tw-shadow-[4px_4px_5px_0px_#38b2ac]"
          bgColor={backgroundColor}
        >
          <ChartCard
            title="Courses"
            count={83}
            percentage={-26.5}
            chartData={data}
            dataKey="pv"
          >
            <FcNegativeDynamic />
          </ChartCard>
        </GridItem>
        <GridItem
          className="tw-shadow-[4px_4px_5px_0px_#38b2ac]"
          borderRadius={"lg"}
          bgColor={backgroundColor}
          gridRow={"span 2"}
        >
          <Box width={"100%"} height={"100%"} padding={"20px"}>
            <CustomPieChart title="Leads by source" data={pieChartData} />
          </Box>
        </GridItem>
        <GridItem
          className="tw-shadow-[4px_4px_5px_0px_#38b2ac]"
          borderRadius={"lg"}
          bgColor={backgroundColor}
        >
          <ChartCard
            title="Orders"
            count={23}
            percentage={73.4}
            chartData={data}
            dataKey="pv"
          >
            <FcPositiveDynamic />
          </ChartCard>
        </GridItem>
        <GridItem
          className="tw-shadow-[4px_4px_5px_0px_#38b2ac]"
          borderRadius={"lg"}
          bgColor={backgroundColor}
        >
          <ChartCard
            title="Income"
            count={"230"}
            percentage={86.4}
            chartData={data}
            dataKey="pv"
          >
            <FcPositiveDynamic />
          </ChartCard>
        </GridItem>
        <GridItem
          className="tw-shadow-[4px_4px_5px_0px_#38b2ac]"
          bgColor={backgroundColor}
          borderRadius={"lg"}
          gridColumn={"span 3"}
          gridRow={"span 2"}
        >
          <Box padding={"30px"} width={"100%"} height={"100%"}>
            <CustomAreaChart />
          </Box>
        </GridItem>

        <GridItem
          className="tw-shadow-[4px_4px_5px_0px_#38b2ac]"
          bgColor={backgroundColor}
          borderRadius={"lg"}
          gridRow={"span 2"}
        >
          <Box width={"100%"} height={"100%"} padding={"20px"}>
            <BarChartComponent
              title="Total Visits"
              data={data}
              barColor="#CC5500	"
            />
          </Box>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default AdminPanel;
