import { Text } from "@chakra-ui/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }:{active?:any , payload?:any,label?:any}) => {
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
