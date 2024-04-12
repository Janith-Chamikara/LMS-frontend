import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import CustomTooltip from "./CustomToolTip";

type PieChart = {
  title: string;
  data: object[];
};

const CustomPieChart: FC<PieChart> = ({ title, data }) => {
  return (
    <Flex width={"100%"} height={"100%"} gap={"10px"} direction={"column"}>
      <Text fontSize={"lg"} fontWeight={"bold"} justifyContent={"center"} alignItems={"center"}>
        {title}
      </Text>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <PieChart>
          <Tooltip content={<CustomTooltip bgColor={"slate-600"} />} />
          <Pie
            data={data}
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((item, index) => (
              <Cell key={`cell-${index}`} fill={item.color} />
            ))}
          </Pie>
          <Legend/>
        </PieChart>
      </ResponsiveContainer>
    </Flex>
  );
};

export default CustomPieChart;
