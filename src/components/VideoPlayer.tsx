// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck 
import { AspectRatio } from "@chakra-ui/react";
import { FC, useEffect, useRef } from "react";
type VideoPlayerPrps = {
  width?: string | number | undefined;
  height?: string | number | undefined;
  src?: string;
};
const VideoPlayer: FC<VideoPlayerPrps> = ({ width, height, src }) => {
  const cloudinaryRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    if (cloudinaryRef.current) return;

    cloudinaryRef.current = window.cloudinary;
    cloudinaryRef.current.videoPlayer(videoRef.current, {
      cloud_name: "deszporw6",
    });
  }, []);

  return (
    // <video
    //   width={width}
    //   height={height}
    //   controls
    //   ref={videoRef}
    //   src='https://res.cloudinary.com/deszporw6/video/upload/v1704889117/courseVideos/ljavu4bohh4hmpv7skqg.mp4'
    // />
    <AspectRatio width={width} height={height} ratio={16/9}>
      <video
        controls
        ref={videoRef}
        src={src}
      />
    </AspectRatio>
  );
};

export default VideoPlayer;
