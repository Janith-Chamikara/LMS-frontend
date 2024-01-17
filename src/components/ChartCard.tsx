import {
  Box,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import TinyLineChart from "./TinyLineChart";

type ChartCard = {
  title: string;
  count: number | string;
  percentage: number;
  children: ReactNode;
  chartData: object[];
  dataKey: string;
};

const ChartCard: FC<ChartCard> = ({
  title,
  count,
  percentage,
  children,
  chartData,
  dataKey,
}) => {
  const color = useColorModeValue("purple.700", "purple.300");
  return (
    <Flex direction={"row"} gap={"10px"} padding={"20px"} height={"100%"}>
      <Stack direction={"column"} justifyContent={"space-between"} flex={1}>
        <Stack direction={"column"} gap={"10px"}>
          <HStack gap={"10px"}>
            {children}
            <Heading fontSize={"lg"}>{title}</Heading>
          </HStack>
          <Text className="tw-font-extrabold tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-teal-600 tw-via-sky-400 tw-to-cyan-500 tw-text-3xl ">
            {typeof count === "string" ? `$${count}` : count}
          </Text>
        </Stack>
        {percentage > 0 ? (
          <Text
            textAlign={"left"}
            className="tw-font-extrabold tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-green-600 tw-via-green-500 tw-to-green-900 tw-text-lg "
          >
            +{percentage}%
          </Text>
        ) : (
          <Text
            textAlign={"left"}
            className="tw-font-extrabold tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-red-600 tw-via-red-500 tw-to-red-900 tw-text-lg "
          >
            {percentage}%
          </Text>
        )}
        <Text
          as={Link}
          textDecorationLine={"underline"}
          fontSize={"small"}
          fontStyle={"italic"}
          textColor={color}
        >
          view more
        </Text>
      </Stack>
      <Stack flex={2} height={"100%"} direction={"column"}>
        <Box width={"100%"} height={"100%"}>
          <TinyLineChart data={chartData} dataKey={dataKey} />
        </Box>
        <Stack direction={"column"} justifyContent={"right"}>
          <Text textAlign={"right"} fontSize={"sm"}>
            Last year
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default ChartCard;
