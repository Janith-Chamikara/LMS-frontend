import { Accordion } from "@chakra-ui/react";
import { FC } from "react";
import CustomAcccordionItem, { Content } from "./CustomAccordionItem";

type AccordionProps = {
  contents: Content[];
};

const CustomAccordion: FC<AccordionProps> = ({ contents }) => {
  console.log(contents);
  return (
    <Accordion allowToggle>
      {contents?.map((content, index) => (
        <CustomAcccordionItem
          index={index}
          videoTitle={content.videoTitle}
          videoThumbnail={content.videoThumbnail}
          videoSrc={content.videoUrl ? content.videoUrl : content.videoURL}
          key={index}
          links={content.links}
          title={content.section as string}
          description={content.videoDescription}
        />
      ))}
    </Accordion>
  );
};

export default CustomAccordion;
