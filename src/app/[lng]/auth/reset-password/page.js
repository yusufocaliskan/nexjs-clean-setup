import ResetPasswordScreen  from "@/screens/auth/reset-password/[token]";

const Page = ({ params: { lng } }) => {
  return <ResetPasswordScreen lng={lng} />;
};

export default Page;
