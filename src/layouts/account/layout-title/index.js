import {Card, Quote, Spacer, Text} from '@/components';

const AccountLayoutTitle = (props) => {
  const {title, desc, ...rest} = props;

  return (
    <Card as="p">
      <Text>{title}</Text>
      <Quote>{desc}</Quote>
    </Card>
  );
};
export default AccountLayoutTitle;
