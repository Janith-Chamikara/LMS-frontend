import {
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FC, useState, useMemo } from "react";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type PasswordProps = {
  children: string;
  placeholder: string;
  name: string;
  errors: FieldErrors<FieldValues>;
  isRequried?: boolean;
  register: UseFormRegister<FieldValues>;
};

const Password: FC<PasswordProps> = ({
  children,
  placeholder,
  name,
  register,
  errors,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const isInvalid = useMemo(() => name in errors, [name, errors]);

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{children}</FormLabel>
      <InputGroup size="md">
        <Input
          variant="filled"
          type={!show ? "password" : "text"}
          {...register(name)}
          placeholder={placeholder}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {errors[name] && (
        <FormErrorMessage>{String(errors[name]?.message)}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default Password;
