import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
type initial = {
  message:string
  condition:"info" | "warning" | "success" | "error" | "loading" | undefined
}

const useToastHook = () => {
  const toast = useToast();
  const [state, setState] = useState<initial | null>(null);
  useEffect(() => {
    if (state) {
      const { message, condition } = state;
      toast({
        title: condition,
        description: message,
        status: condition,
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });
    }
  }, [state]);
  return [setState];
};

export default useToastHook;