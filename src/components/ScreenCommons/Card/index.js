const Card = (props) => {
  const {children, id, style} = props;

  const testDataAttr = process.env.NODE_ENV === 'test' && {'data-testid': `${id}`};
  return (
    <div {...testDataAttr} id={id} style={style}>
      {children}
    </div>
  );
};
export default Card;
