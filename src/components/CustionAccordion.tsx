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
<<<<<<< HEAD
          links = {content.links}
          title={content.section}
=======
          links={content.links}
          title={content.section as string}
>>>>>>> e5121811d9081d638c02986dd7ff208ebdb519c2
          description={content.videoDescription}
        />
      ))}
    </Accordion>
  );
};

export default CustomAccordion;
