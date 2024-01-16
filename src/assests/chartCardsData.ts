import { IconType } from "react-icons";
import { FcPositiveDynamic } from "react-icons/fc";
type cardType = {
  title: string;
  count: number;
  icon: IconType;
  chartData: object;
  percentage: number;
};

export const data = [
  {
    name: "January",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "February",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "March",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "May",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "August",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "September",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "October",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "November",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "December",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const chartCardData: cardType[] = [
  {
    title: "Total Users",
    count: 53,
    icon: FcPositiveDynamic,
    percentage: 77,
    chartData: data,
  },
];
