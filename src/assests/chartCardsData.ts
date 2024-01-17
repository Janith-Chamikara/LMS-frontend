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

export const pieChartData = [
  { name: "Laptop", value: 400, color: "#0088FE" },
  { name: "Smart Phones", value: 300, color: "#00C49F" },
  { name: "Tablet", value: 300, color: "#FFBB28" },
  { name: "Other", value: 200, color: "#FF8042" },
];

export const areaChartData = [
  {
    name: 'IT',
    "2021": 40,
    "2022": 24,
    "2023": 31,
  },
  {
    name: "Business",
    "2021": 30,
    "2022": 13,
    "2023": 22,
  },
  {
    name: "Tech",
    "2021": 20,
    "2022": 98,
    "2023": 22,
  },
  {
    name: "Arts",
    "2021": 27,
    "2022": 39,
    "2023": 20,
  },
  {
    name: "Education",
    "2021": 18,
    "2022": 48,
    "2023": 21,
  },
  {
    name: "Science",
    "2021": 23,
    "2022": 38,
    "2023": 25,
  },
  {
    name: "Soft skills",
    "2021": 34,
    "2022": 43,
    "2023": 21,
  },
];
