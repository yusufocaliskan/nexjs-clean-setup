import styled from '@emotion/styled';

const Card = (props) => {
  const {children, id, className, bg, style, ...rest} = props;

  const testDataAttr = process.env.NODE_ENV === 'test' ? {'data-testid': `${id}`} : id;

  const CardWrapper = styled.div`
    width: ${(props) => props.width?.base || props.width || '100%'};
    display: ${(props) => props.display?.base || props.display};
    height: ${(props) => props.height?.base || props.height};
    background: ${(props) => props.bg?.base || props.bg};
    justify-content: ${(props) => props.justifyContent?.base || props.justifyContent};
    align-items: ${(props) => props.alignItems?.base || props.alignItems};
    gap: ${(props) => props.gap?.base || props.gap};

    @media (min-width: 768px) {
      width: ${(props) => props.width?.md};
      display: ${(props) => props.display?.md};
      background: ${(props) => props.bg?.md};
      height: ${(props) => props.height?.md};
      justify-content: ${(props) => props.justifyContent?.md};
      align-items: ${(props) => props.alignItems?.md};
      gap: ${(props) => props.gap?.md};
    }
    @media (min-width: 1024px) {
      width: ${(props) => props.width?.lg};
      display: ${(props) => props.display?.lg};
      height: ${(props) => props.height?.lg};
      background: ${(props) => props.bg?.lg};
      justify-content: ${(props) => props.justifyContent?.lg};
      align-items: ${(props) => props.alignItems?.lg};
      gap: ${(props) => props.gap?.lg};
    }
  `;

  return (
    <>
      <style></style>
      <CardWrapper className={className} {...testDataAttr} {...rest} id={id} style={style}>
        {children}
      </CardWrapper>
    </>
  );
};
export default Card;
