import styled from '@emotion/styled';

const Card = (props) => {
  const {children, onClick, as = 'div', id, className, style, ...rest} = props;

  const testDataAttr = process.env.NODE_ENV === 'test' ? {'data-testid': `${id}`} : id;

  const generateProperties = (props, size) => {
    const keys = Object.keys(props);
    const result = [];
    keys.map((key) => {
      const value = isObject(props[key]) ? props[key][size] : props[key];
      const propery = value ? `${key}: ${value} !important;` : '';
      result.push(propery);
    });
    return result.join('');
  };

  const isObject = (value) => {
    return typeof value === 'object' && value !== null;
  };

  const defaultProperties = `
        width: 100%;
  `;

  const CardWrapper = styled.div`
    ${defaultProperties}
    ${generateProperties(rest, 'base')};
    @media (min-width: 768px) {
      ${defaultProperties}
      ${generateProperties(rest, 'md')};
    }
    @media (min-width: 1024px) {
      ${defaultProperties}
      ${generateProperties(rest, 'lg')};
    }
  `;

  return (
    <>
      <CardWrapper onClick={onClick} as={as} className={className} {...testDataAttr} {...rest} id={id} style={style}>
        {children}
      </CardWrapper>
    </>
  );
};
export default Card;
