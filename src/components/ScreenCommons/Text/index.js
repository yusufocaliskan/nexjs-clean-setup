import Card from '../Card';
const Text = (props) => {
  const {children, ...rest} = props;
  return (
    <Card as="p" {...rest}>
      {children}
    </Card>
  );
};

export default Text;
