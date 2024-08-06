import { FC } from "react";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import { motion } from "framer-motion";
import { springOptions } from "./springOptions";

const imgs: string[] = [img1, img2, img3, img4];

type ImagesProps = { imgIndex: number };

const Images: FC<ImagesProps> = ({ imgIndex }) => {
  return (
    <>
      {imgs.map((img, index) => (
        <motion.div
          key={index}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="tw-aspect-video tw-w-screen tw-shrink-0 tw-object-cover tw-mx-auto"
          animate={{
            scale: imgIndex === index ? "0.95" : "0.85",
          }}
          transition={springOptions}
        />
      ))}
    </>
  );
};

export default Images;
