import { Flex, Image, Tooltip } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AvatarRenderer = ({ value }: { value: string }) => (
  <Tooltip hasArrow padding={'10px'} label={<Image src={value}/>}>
    <Flex
      height={"100%"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Link to={value}>
        <img
          alt={`${value} Flag`}
          src={value}
          style={{
            display: "block",
            width: "50px",
            filter: "brightness(1.1)",
          }}
        />
      </Link>
    </Flex>
  </Tooltip>
);

export default AvatarRenderer;
