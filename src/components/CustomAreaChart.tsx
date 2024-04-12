import { Flex, Text } from "@chakra-ui/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { areaChartData } from "../assests/chartCardsData";
const CustomAreaChart = () => {
  return (
    <Flex direction={"column"} gap={'10px'} height={"100%"} width={"100%"}>
      <Text fontSize={"lg"} fontWeight={"bold"}>
        Course Selling Analytics
      </Text>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={areaChartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{color:'black'}}/>
          <Area
            type="monotone"
            dataKey="2021"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="2022"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="2023"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
          <Legend />
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  );
};

export default CustomAreaChart;
