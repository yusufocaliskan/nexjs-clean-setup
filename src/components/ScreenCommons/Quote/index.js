import {motion} from 'framer-motion';
import Card from '../Card';
const Quote = (props) => {
  const {children, ...rest} = props;
  return (
    <motion.div initial={{opacity: 0.5, y: -30}} animate={{opacity: 1, y: 0}}>
      <Card as="p" font-size="1.2rem" color="var(--gray)" font-weight="thin" {...rest}>
        {children}
      </Card>
    </motion.div>
  );
};

export default Quote;
