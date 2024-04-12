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
          links={content.links}
          title={content.section as string}
          description={content.videoDescription}/>
=======
          title={content.section}
          description={content.videoDescription}
        />
>>>>>>> parent of 2b76085 (updated)
      ))}
    </Accordion>
  );
};

export default CustomAccordion;
