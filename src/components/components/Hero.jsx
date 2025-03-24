import { motion } from 'framer-motion';
import { styles } from '../../styles';
import { ComputersCanvas } from './canvas';
import TextAnimation from "../../TextAnimations/TextAnimation";

const Hero = () => {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
    };
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className = "w-1 sm:h-80 h-40 violet-gradient"/> 
        </div>
        <div>
          <h1 className = {`${styles.heroHeadText} text-white`}>
          <TextAnimation text="I'm " delay={0.5} />
            <span className="text-[#915eff]">
              <TextAnimation text="Nathan" delay={0.8} />
            </span>  
          </h1>
          <motion.p 
            className={`${styles.heroSubText} mt-2 text-white-100`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              delay: 1.3, // Start after name animation
              ease: "easeOut"
            }}
          >
            I'm currently a student at the University of Limerick studying <br className = "sm:block hidden"/>  Immersive Software Engineering.
          </motion.p>
        </div>
      </div>
      
      
      
      {/*<div className="absolute xs:bottom-10
      bottom-32 w-full flex justify-center
      items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] 
          rounded-3xl border-4 border-secondary
          flex justify-center items-start p-2">
            <motion.div
              animate={{
              y: [0, 24, 0]
            }} 
            transition ={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop'
            }}
            className="w-3 h-3 rounded-full bg-secondary mb-1"
            />  
          </div>
        </a>

      </div>*/}

      
    </section>
  );
};

export default Hero;