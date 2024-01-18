import {Card, Quote, Spacer, Text} from '@/components';
const AccountLayoutTitle = (props) => {
  const {title, desc, ...rest} = props;

  return (
    <Card animated {...rest}>
      <Text font-weight="bold" font-size="2rem">
        {title}
      </Text>
      <Quote>{desc}</Quote>
    </Card>
  );
};
export default AccountLayoutTitle;
