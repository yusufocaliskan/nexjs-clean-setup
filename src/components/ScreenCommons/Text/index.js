import {motion} from 'framer-motion';
import './textStyle.scss';
import Card from '../Card';
const Text = (props) => {
  const {children, ...rest} = props;
  return (
    <motion.div initial={{opacity: 0.5, y: -30}} animate={{opacity: 1, y: 0}}>
      <Card as="h1" font-size="2.5rem" font-weight="bold" {...rest}>
        {children}
      </Card>
    </motion.div>
  );
};

export default Text;
