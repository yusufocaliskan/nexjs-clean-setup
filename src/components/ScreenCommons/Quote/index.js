import {motion} from 'framer-motion';
import './quoteStyle.scss';
const Quote = ({children}) => {
  return (
    <motion.div initial={{opacity: 0.5, y: -30}} animate={{opacity: 1, y: 0}}>
      <p className="quote-text">{children}</p>
    </motion.div>
  );
};

export default Quote;
