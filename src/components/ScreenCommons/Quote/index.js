import Card from '../Card';
import Text from '../Text';
const Quote = (props) => {
  const {children, ...rest} = props;
  return (
    <Text font-size="1.2rem" color="var(--gray)" font-weight="thin" {...rest}>
      {children}
    </Text>
  );
};

export default Quote;
