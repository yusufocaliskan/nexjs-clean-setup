//To protec a area in any component,
//cover it tthis
const ProtectedArea = ({ children, session }) => {
  const isAuthorized = session?.data?.isAuthenticated;

  // or let the see the actual page
  if (!isAuthorized) return <></>;

  if (isAuthorized) return <>{children}</>;
};

export default ProtectedArea;
