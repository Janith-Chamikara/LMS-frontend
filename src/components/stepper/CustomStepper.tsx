import {
  Box,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { FC } from "react";

type Steps = {
  description: string;
  title: string;
};

type StepperProps = {
  steps: Steps[];
  activeStep:number;
};

const CustomStepper: FC<StepperProps> = ({ steps,activeStep }) => {
  
  const activeStepText = steps[activeStep]?.description;
  const [isSmallerThanMD] = useMediaQuery("(max-width: 768px)");
  return isSmallerThanMD ? (
    <Stack>
      <Stepper size="sm" index={activeStep} gap="0">
        {steps.map((_, index) => (
          <Step key={index} gap="0">
            <StepIndicator>
              <StepStatus complete={<StepIcon />} />
            </StepIndicator>
            <StepSeparator _horizontal={{ ml: "0" }} />
          </Step>
        ))}
      </Stepper>
      <Text>
        Step {activeStep + 1}: <b>{activeStepText}</b>
      </Text>
    </Stack>
  ) : (
    <Stepper size="lg" index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step?.title}</StepTitle>
            <StepDescription>{step?.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default CustomStepper;
