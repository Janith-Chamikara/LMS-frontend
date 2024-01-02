import { useMotionValue, motion } from "framer-motion";
import { useMediaQuery } from "@chakra-ui/react";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { springOptions } from "./springOptions";
import { reviews } from "./reviews";
import Testimonials from "./Testimonials";

const dragBuffer = 50;
const delay = 10000;

const SwipeCarousel: FC = () => {
  const [isSmallerThanMd] = useMediaQuery("(max-width: 768px)");
  const [dragging, setDragging] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);

  useEffect(() => {
    const timeOut: ReturnType<typeof setInterval> = setInterval(() => {
      const x = dragX.get();
      if (x === 0) {
        setImgIndex((previous) => {
          if (previous === reviews.length - 1) {
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

    if (x <= -dragBuffer && imgIndex < reviews.length - 1) {
      setImgIndex((p) => p + 1);
    } else if (x > dragBuffer && imgIndex > 0) {
      setImgIndex((p) => p - 1);
    }
  };

  return (
    <>
      <div className="tw-relative tw-overflow-hidden tw-py-8 tw-mx-[10px]">
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
            translateX: isSmallerThanMd
              ? `-${imgIndex * 100}%`
              : `-${imgIndex * 50}%`,
          }}
          transition={springOptions}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          className="tw-flex  tw-items-center tw-cursor-grab tw-w-[100vw] md:tw-w-[90vw] active:tw-cursor-grabbing "
        >
          <Testimonials ID={imgIndex}/>
        </motion.div>
        <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
      </div>
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
      {reviews.map((_, index) => (
        <button
          onClick={() => setImgIndex(index)}
          key={index}
          className={`tw-h-3 tw-w-3 tw-rounded-full ${
            imgIndex === index ? "tw-bg-neutral-300" : "tw-bg-neutral-500"
          }`}
        />
      ))}
    </div>
  );
};

export default SwipeCarousel;
