import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay / 1000,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: direction === 'top' ? -50 : 50,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.p
      className={`blur-text ${className} flex flex-wrap`}
      variants={container}
      initial="hidden"
      animate="visible"
      onAnimationComplete={onAnimationComplete}
    >
      {elements.map((element, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
        >
          {element}
          {animateBy === 'words' && index < elements.length - 1 && ' '}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default BlurText;