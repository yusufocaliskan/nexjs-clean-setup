import styled from '@emotion/styled';

const Card = (props) => {
  const {children, id, width, height, bg, display, style} = props;

  const testDataAttr = process.env.NODE_ENV === 'test' ? {'data-testid': `${id}`} : id;

  const CardWrapper = styled.div`
    width: ${(props) => props.width?.base};
    display: ${(props) => props.display?.base};
    height: ${(props) => props.height?.base};
    background: ${(props) => props.bg?.base};

    @media (min-width: 768px) {
      width: ${(props) => props.width?.md};
      display: ${(props) => props.display?.md};
      background: ${(props) => props.bg?.md};
      height: ${(props) => props.height?.md};
    }
    @media (min-width: 1024px) {
      width: ${(props) => props.width?.lg};
      display: ${(props) => props.display?.lg};
      height: ${(props) => props.height?.lg};
      background: ${(props) => props.bg?.lg};
    }
  `;
  return (
    <>
      <style></style>
      <CardWrapper display={display} bg={bg} width={width} height={height} {...testDataAttr} id={id} style={style}>
        {children}
      </CardWrapper>
    </>
  );
};
export default Card;
