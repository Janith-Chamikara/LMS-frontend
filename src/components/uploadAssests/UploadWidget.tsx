// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Button } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window:any;
const UploadWidget = ({
  text,
  demo,
  setDemoUrl,
  setSectionUrls,
  sectionUrls,
}) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "deszporw6",
        uploadPreset: "afnlafw7",
      },
      function (error, result) {
        console.log(result.info.secure_url);
        if (demo) {
          result?.info?.secure_url && setDemoUrl(result.info.secure_url);
        } else {
          result?.info?.secure_url &&
            setSectionUrls([...sectionUrls, result.info.secure_url]);
        }

        // Handle the result or error here
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Button
        mt={"5px"}
        variant={"solid"}
        colorScheme="facebook"
        onClick={() => widgetRef.current.open()}
      >
        {text}
      </Button>
    </div>
  );
};

export default UploadWidget;
