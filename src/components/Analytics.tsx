import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { FcPositiveDynamic, FcNegativeDynamic } from "react-icons/fc";
import ChartCard from "./ChartCard";
import { data, pieChartData } from "../assests/chartCardsData";
import BarChartComponent from "./BarChart";
import CustomPieChart from "./CustomPieChart";
import { Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import CustomAreaChart from "./CustomAreaChart";

const Analytics: FC = () => {
  const backgroundColor = useColorModeValue("gray.100", "gray.900");
  return (
    <>
      <Grid
        width={"100%"}
        borderRadius={"lg"}
        templateColumns={["1fr","repeat(4,1fr)"]}
        gap={"10px"}
        gridAutoRows={"minmax(200px,auto)"}
      >
        <GridItem
          className="tw-shadow-[4px_4px_5px_0px_#38b2ac]"
          borderRadius={"lg"}
          bgColor={backgroundColor}
          
          gridRow={{lg:"span 2"}}
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
            count={14}
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
            count={13}
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
          gridRow={{lg:"span 2"}}
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
          gridRow={{lg:"span 2"}}
        >
          <Box padding={"30px"} width={"100%"} height={"100%"}>
            <CustomAreaChart />
          </Box>
        </GridItem>

        <GridItem
          className="tw-shadow-[4px_4px_5px_0px_#38b2ac]"
          bgColor={backgroundColor}
          borderRadius={"lg"}
          gridRow={{lg:"span 2"}}
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
    </>
  );
};
export default Analytics;
