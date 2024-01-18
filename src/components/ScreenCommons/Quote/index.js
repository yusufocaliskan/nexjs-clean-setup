import Card from '../Card';
const Quote = (props) => {
  const {children, ...rest} = props;
  return (
    <Card as="p" font-size="1.2rem" color="var(--gray)" font-weight="thin" {...rest}>
      {children}
    </Card>
  );
};

export default Quote;
