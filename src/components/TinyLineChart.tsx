import { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type TinyLineChartProps = {
  data: object[];
  dataKey: string;
};

const TinyLineChart: FC<TinyLineChartProps> = ({ data, dataKey }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
        
        <Tooltip contentStyle={{backgroundColor:"transparent",border:'none'}} labelStyle={{display:"none"}} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TinyLineChart;
