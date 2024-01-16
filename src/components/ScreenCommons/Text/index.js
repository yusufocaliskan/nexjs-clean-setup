import {motion} from 'framer-motion';
import './textStyle.scss';
const Text = ({children}) => {
  return (
    <motion.div initial={{opacity: 0.5, y: -30}} animate={{opacity: 1, y: 0}}>
      <h1 className="pretty-text">{children}</h1>
    </motion.div>
  );
};

export default Text;
