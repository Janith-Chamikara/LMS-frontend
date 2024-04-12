import { FC } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";
import { ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
type params = {
  inputText:string | undefined;
  onClick:(e:React.ChangeEvent<HTMLInputElement>)=>void;
}
const SearchBar: FC<params> = ({inputText,onClick}) => {
  return (
    <>
      <InputGroup borderRadius={0} size="lg">
        <InputLeftElement
          pointerEvents="none"
          children={<Search2Icon color="gray.600" />}
        />
        <Input
          type="text"
          value={inputText}
          onChange={onClick}
          placeholder="Search any course"
          border="1px solid #949494"
        />
        <InputRightAddon p={0}>
          {/* <Button
            borderRadius={0}
            onClick={onClick}
            height={"100%"}
            variant={"solid"}
            colorScheme="teal"
            borderLeftRadius={0}
          >
            Search
          </Button> */}
          <Menu>
            <MenuButton
              borderLeftRadius={0}
              height={"100%"}
              as={Button}
              variant={"outline"}
              colorScheme="teal"
            >
              Filter <ChevronDownIcon />
            </MenuButton>
            <Portal>
              <MenuList>
                <MenuItem>Ascending</MenuItem>
                <MenuDivider />
                <MenuItem>Dscending</MenuItem>
                <MenuDivider />
                <MenuItem>Modified recently</MenuItem>
                <MenuDivider />
                <MenuItem>Oldest</MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </InputRightAddon>
      </InputGroup>
    </>
  );
};

export default SearchBar;
