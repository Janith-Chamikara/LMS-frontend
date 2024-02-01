import { Text } from "@chakra-ui/react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`tw-p-[10px] tw-bg-gray-700 tw-rounded-xl`}>
        <Text textColor={"gray.400"}>{`${label ? label: payload[0].name} : ${payload[0].value}`}</Text>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
