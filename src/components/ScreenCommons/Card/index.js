import styled from '@emotion/styled';
import {motion} from 'framer-motion';
const Card = (props) => {
  const {children, animated, onClick, as = 'div', id, className, style, ...rest} = props;

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
        font-family: 'DM Sans';
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

  if (animated) {
    return (
      <CardWrapper
        onClick={onClick}
        as={motion.div}
        className={className}
        {...testDataAttr}
        {...rest}
        id={id}
        style={style}
        initial={{y: -20, opacity: 0.5}}
        animate={{y: 0, opacity: 1}}
      >
        {children}
      </CardWrapper>
    );
  }
  return (
    <>
      <CardWrapper onClick={onClick} as={as} className={className} {...testDataAttr} {...rest} id={id} style={style}>
        {children}
      </CardWrapper>
    </>
  );
};
export default Card;
