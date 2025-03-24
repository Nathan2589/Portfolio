import {VerticalTimeline,
  VerticalTimelineElement} from 'react-vertical-timeline-component';
import {motion} from 'framer-motion';
import RollingGallery from '../../BGAnimation/RollingGallery'

import 'react-vertical-timeline-component/style.min.css';

import {styles} from '../../styles';
import {experiences} from '../../constants';
import {SectionWrapper} from '../../hoc';
import {textVariant} from '../../utils/motion';



const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          My Projects
        </h2>
      </motion.div>

      <div className='mt-7 flex flex-col'>
        <RollingGallery autoplay={true} pauseOnHover={true} />
        
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");