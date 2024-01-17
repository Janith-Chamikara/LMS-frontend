import { FC } from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Flex, Text } from "@chakra-ui/react";
import CustomTooltip from "./CustomToolTip";

type Props = {
  title:string;
  data:object[];
  barColor?:string;
}

const BarChartComponent: FC<Props>= ({title,data,barColor}) => {
  return (
    <>
      <Flex width={"100%"} height={"100%"} gap={"10px"} direction={"column"}>
        <Text
          fontWeight={"bold"}
          justifyContent={"center"}
          fontSize={"lg"}
          alignItems={"center"}
        >
          {title}
        </Text>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={40} data={data}>
            <XAxis dataKey="name" display={"none"} />
            <Tooltip
              content={<CustomTooltip bgColor={'slate-600'} />}
              contentStyle={{ backgroundColor: "#2a3447" }}
              cursor={{ fill: "none" }}
              labelStyle={{ display: "none" }}
            />
            <Bar dataKey="uv" fill={barColor ? barColor :"#8884d8"} />
          </BarChart>
        </ResponsiveContainer>
      </Flex>
    </>
  );
};

export default BarChartComponent;
