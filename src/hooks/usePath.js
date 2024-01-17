import {usePathname} from 'next/navigation';

const usePath = () => {
  const pathname = usePathname();

  //Language Cleared path
  const languageClearedPath = pathname.substring(3);

  //is the given screen is currently in used?
  //
  const checkIfTheScreenIsActive = (route) => languageClearedPath == route;

  return {pathname, languageClearedPath, checkIfTheScreenIsActive};
};
export default usePath;
