import LeftSide from "@/screens/auth/left-side";
import { motion } from "framer-motion";

const AuthLayout = ({ children, headerLinkRender }) => {
  return (
    <div className="login-page-container">
      <LeftSide />
      <div className="login-page-right">
        <motion.div
          initial={{ opacity: 0.5, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="login-page-right-top"
        >
          <div className="login-page-right-top-logo"></div>
          {headerLinkRender}
        </motion.div>

        <div className="login-page-right-content">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
