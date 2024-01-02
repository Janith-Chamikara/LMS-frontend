import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import { motion, useMotionValue } from "framer-motion";
const imgs: string[] = [img1, img2, img3, img4];

const dragBuffer = 50;
const delay = 10000;
const springOptions = {
  type: "spring",
  damping: "50",
  stiffness: "400",
  mass: "3",
};

const SwipeCarousel: FC = () => {
  const [dragging, setDragging] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);

  useEffect(() => {
    const timeOut: ReturnType<typeof setInterval> = setInterval(() => {
      const x = dragX.get();
      if (x === 0) {
        setImgIndex((previous) => {
          if (previous === imgs.length - 1) {
            return 0;
          }
          return previous + 1;
        });
      }
    }, delay);
    return () => clearInterval(timeOut);
  }, []);

  const onDragStart = () => {
    setDragging(true);
    console.log("start");
    console.log(dragging);
  };

  const onDragEnd = () => {
    setDragging(false);
    console.log("end");
    const x = dragX.get();
    console.log(x);

    if (x <= -dragBuffer && imgIndex < imgs.length - 1) {
      setImgIndex((p) => p + 1);
    } else if (x > dragBuffer && imgIndex > 0) {
      setImgIndex((p) => p - 1);
    }
  };

  return (
    <>
      <div className="tw-relative tw-overflow-hidden tw-bg-neutral-950 tw-py-8">
        <motion.div
          drag="x"
          dragConstraints={{
            left: 0,
            right: 0,
          }}
          style={{
            x: dragX,
          }}
          animate={{
            translateX: `-${imgIndex * 100}%`,
          }}
          transition={springOptions}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          className="tw-flex tw-items-center tw-cursor-grab tw-w-[100vw] active:tw-cursor-grabbing"
        >
          <Images imgIndex={imgIndex} />
        </motion.div>
        <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
      </div>
    </>
  );
};

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

type DotsProps = {
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
};

const Dots: FC<DotsProps> = ({ imgIndex, setImgIndex }) => {
  return (
    <div className="tw-flex tw-mt-4 tw-justify-center tw-items-center tw-gap-2 tw-w-full">
      {imgs.map((_, index) => (
        <button
          onClick={() => setImgIndex(index)}
          key={index}
          className={`tw-h-3 tw-w-3 tw-rounded-full ${
            imgIndex === index ? "tw-bg-neutral-50" : "tw-bg-neutral-500"
          }`}
        />
      ))}
    </div>
  );
};

export default SwipeCarousel;
