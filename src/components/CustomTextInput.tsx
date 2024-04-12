import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FC, useMemo } from "react";
import {
  Message,
  Validate,
  FieldErrors,
  FieldValues,
  ValidationRule,
  UseFormRegister,
} from "react-hook-form";
export type RegisterOptions = Partial<{
  required: Message | ValidationRule<boolean>;
  min: ValidationRule<number | string>;
  max: ValidationRule<number | string>;
  maxLength: ValidationRule<number | string>;
  minLength: ValidationRule<number | string>;
  pattern: ValidationRule<RegExp>;
  validate: Validate<string, string> | Record<string, Validate<string, string>>;
}>;

type InputProps = {
  fieldName?: string;
  propertyName?: string;
  index?: number;
  flushed?: boolean;
  children?: string;
  type: string;
  placeholder: string;
  name: string;
  isRequired?: boolean;
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
};
const CustomTextInput: FC<InputProps> = ({
  children,
  type,
  fieldName,
  placeholder,
  name,
  flushed,
  register,
  errors,
  isRequired,
}) => {
  console.log(errors);
  // console.log(errors?.[fieldName]?.[index]?.[propertyName]?.message)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isInvalid = useMemo(() => (name in errors || (fieldName as string) in errors), [errors, name]);
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{children}</FormLabel>
      <Input
        variant={flushed ? "flushed" : "filled"}
        type={type}
        {...register(name as string)}
        placeholder={placeholder}
        isRequired={isRequired}
      />
      {errors[name] && (
        <FormErrorMessage>{`${errors?.[name as keyof typeof errors]?.message}`}</FormErrorMessage>
      )}
      {(!errors[name] && errors[fieldName as keyof typeof errors]) && (
        <FormErrorMessage>{`${errors?.[name as keyof typeof errors]?.message}`}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default CustomTextInput;
