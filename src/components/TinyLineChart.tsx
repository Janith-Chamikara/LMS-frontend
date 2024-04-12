import { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomToolTip";

type TinyLineChartProps = {
  data: object[];
  dataKey: string;
};

const TinyLineChart: FC<TinyLineChartProps> = ({ data, dataKey }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
        <XAxis dataKey="name" display={"none"} />
        <Tooltip
          content={<CustomTooltip bgColor={"transparent"} />}
          contentStyle={{ backgroundColor: "#2a3447" }}
          cursor={{ fill: "none" }}
          labelStyle={{ display: "none" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TinyLineChart;
