import { Accordion } from "@chakra-ui/react";
import { FC } from "react";
import CustomAcccordionItem, { Content } from "./CustomAccordionItem";

type AccordionProps = {
  contents: Content[];
};

const CustomAccordion: FC<AccordionProps> = ({ contents }) => {
  return (
    <Accordion allowToggle allowMultiple>
      {contents.map((content, index) => (
        <CustomAcccordionItem
          key={index}
          title={content.title}
          description={content.description}
          subTopics={content.subTopics}
        />
      ))}
    </Accordion>
  );
};

export default CustomAccordion;
