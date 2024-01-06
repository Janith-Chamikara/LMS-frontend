import {
  Variant,
  Variants,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import { FC, useEffect, useRef } from "react";

type AnimatedTextProps = {
  text: string | string[];
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  once?: boolean;
  animation?: {
    hidden: Variant;
    visible: Variant;
  };
};

const charAnimation: Variants = {
  visible: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
};

const AnimatedText: FC<AnimatedTextProps> = ({
  el: Wrapper = "p",
  text,
  delay,
  className,
  once,
}) => {
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { amount: 0.8, once });
  useEffect(() => {
    let timeOut: ReturnType<typeof setTimeout>;
    const show = () => {
      controls.start("visible");
      timeOut = setTimeout(async () => {
        await controls.start("hidden");
        controls.start("visible");
      }, delay);
    };
    if (isInView) {
      show();
    } else {
      controls.start("hidden");
    }
    return () => clearTimeout(timeOut);
  }, [isInView]);

  const textArray = Array.isArray(text) ? text : [text];
  return (
    <Wrapper className={className}>
      <span className="tw-sr-only">{textArray.join(" ")}</span>
      <motion.span
        ref={ref}
        aria-hidden
        initial={"hidden"}
        animate={controls}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
          hidden: {},
        }}
      >
        {textArray.map((line, index) => (
          <span className="tw-inline-block" key={index}>
            {line.split(" ").map((word) => (
              <span className="tw-inline-block">
                {word.split("").map((char) => (
                  <motion.span
                    variants={charAnimation}
                    className="tw-inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
                <span>&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

// const animation = {
//   hidden: {
//     opacity: 0,
//     y: 100,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//   },
// };

// const AnimatedText = ({
//   text,
//   el: Wrapper = "p",
//   delay,
// }: AnimatedTextProps) => {
//   const ref = useRef<HTMLElement>(null);
//   const controls = useAnimation();
//   const isInView = useInView(ref, { amount: 0.5, once: false });
//   // useEffect(() => {
//   //   let timeout;
//   //   const show = () => {
//   //     controls.start("visible");
//   //     timeout = setTimeout(async () => {
//   //      controls.start("hidden");

//   //     }, 1000);
//   //   };

//   //   if (isInView) {
//   //     show();
//   //   } else {
//   //     controls.start("hidden");
//   //   }
//   //   return clearTimeout(timeout);
//   // }, [isInView]);
//   useEffect(() => {
//     let timeout;
//     const show = () => {
//       controls.start("visible");

//       timeout = setTimeout(async () => {
//         await controls.start("hidden");
//         controls.start("visible");
//       }, delay);
//     };

//     if (isInView) {
//       show();
//     } else {
//       controls.start("hidden");
//     }

//     return () => clearTimeout(timeout);
//   }, [isInView]);

//   return (
//     <Wrapper>
//       <span className="tw-sr-only">{text}</span>
//       <motion.span
//         ref={ref}
//         aria-hidden
//         className="tw-text-[100px] tw-inline-block"
//         initial="hidden"
//         animate={controls}
//         variants={{
//           visible: { transition: { staggerChildren: 0.1 } },
//           hidden: {},
//         }}
//       >
//         {text?.split(" ").map((word) => (
//           <span className="tw-inline-block">
//             {word.split("").map((char) => (
//               <motion.span className="tw-inline-block" variants={animation}>
//                 {char}
//               </motion.span>
//             ))}
//             <span>&nbsp;</span>
//           </span>
//         ))}
//       </motion.span>
//     </Wrapper>
//   );
// };

export default AnimatedText;

