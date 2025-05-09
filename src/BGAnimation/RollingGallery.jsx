import { useEffect, useState } from "react";
import {
motion,
useMotionValue,
useAnimation,
useTransform,
} from "framer-motion";
import { useNavigate } from 'react-router-dom';

import Neural from "../gallery/Neural.png"
import flappy from "../gallery/flappy.png"

const RollingGallery = ({
autoplay = false,
pauseOnHover = false,
images = [
    Neural,
    flappy,
    Neural, // Duplicated to fill space
    flappy,
    Neural,
    flappy,
    Neural,
    flappy,
    Neural,
    flappy,
],
labels = [
    "Neural Network From Scratch",
    "Flappy Bird AI",
    "Neural Network From Scratch",
    "Flappy Bird AI",
    "Neural Network From Scratch",
    "Flappy Bird AI",
    "Neural Network From Scratch",
    "Flappy Bird AI",
    "Neural Network From Scratch",
    "Flappy Bird AI",
  ],
}) => {
const [isScreenSizeSm, setIsScreenSizeSm] = useState(
  window.innerWidth <= 640
);
useEffect(() => {
  const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

const navigate = useNavigate();

const cylinderWidth = isScreenSizeSm ? 1600 : 2400;
const faceCount = images.length;
const faceWidth = (cylinderWidth / faceCount) * 1.5;
const radius = cylinderWidth / (2 * Math.PI);

const dragFactor = 0.05;
const rotation = useMotionValue(0);
const controls = useAnimation();

const transform = useTransform(
  rotation,
  (val) => `rotate3d(0,1,0,${val}deg)`
);

const startInfiniteSpin = (startAngle) => {
  controls.start({
    rotateY: [startAngle, startAngle - 360],
    transition: {
      duration: 20,
      ease: "linear",
      repeat: Infinity,
    },
  });
};

useEffect(() => {
  if (autoplay) {
    const currentAngle = rotation.get();
    startInfiniteSpin(currentAngle);
  } else {
    controls.stop();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [autoplay]);

const handleUpdate = (latest) => {
  if (typeof latest.rotateY === "number") {
    rotation.set(latest.rotateY);
  }
};

const handleDrag = (_, info) => {
  controls.stop();
  rotation.set(rotation.get() + info.offset.x * dragFactor);
};

const handleDragEnd = (_, info) => {
  const finalAngle = rotation.get() + info.velocity.x * dragFactor;
  rotation.set(finalAngle);

  if (autoplay) {
    startInfiniteSpin(finalAngle);
  }
};

const handleMouseEnter = () => {
  if (autoplay && pauseOnHover) {
    controls.stop();
  }
};
const handleMouseLeave = () => {
  if (autoplay && pauseOnHover) {
    const currentAngle = rotation.get();
    startInfiniteSpin(currentAngle);
  }
};

return (
  <div className="relative h-[500px] w-full overflow-hidden">
    
      

    <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
      <motion.div
        drag="x"
        dragElastic={0}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={controls}
        onUpdate={handleUpdate}
        style={{
          transform: transform,
          rotateY: rotation,
          width: cylinderWidth,
          transformStyle: "preserve-3d",
        }}
        className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
      >
        {images.map((url, i) => (
          <div
            key={i}
            onClick={() => navigate('/loading')}
            className="group absolute flex flex-col h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${(360 / faceCount) * i
                }deg) translateZ(${radius}px)`,
            }}
          >
            <p className="text-white text-wrap text-xl font-black mb-4 [text-shadow:_0_2px_4px_rgba(0,0,0,0.5)] justify-items-center">
                {labels[i]}
              </p>
            <img
              src={url}
              alt={labels[i]}
              className="pointer-events-none h-[120px] w-[300px] rounded-[15px] border-[3px] border-white object-cover
                         transition-transform duration-300 ease-out group-hover:scale-105
                         sm:h-[100px] sm:w-[220px]"
            />
          </div>
        ))}
      </motion.div>
    </div>
  </div>
);
};

export default RollingGallery;