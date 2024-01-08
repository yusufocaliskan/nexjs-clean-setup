import ForgotPasswordScreen  from "@/screens/auth/forgot-password";

const Page = ({ params: { lng } }) => {
  return <ForgotPasswordScreen lng={lng} />;
};

export default Page;
