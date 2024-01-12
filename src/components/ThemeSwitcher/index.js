import {setTheme} from '@/store/app';
import {useDispatch, useSelector} from 'react-redux';

import {MdSunny} from 'react-icons/md';
import {TbMoonFilled} from 'react-icons/tb';
import {motion} from 'framer-motion';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);

  //Switching current themee
  const handleSwitcheTheme = (theme) => {
    //REmove opposite
    if (theme == 'dark_theme') {
      document.body.classList.remove('light_theme');
    } else {
      document.body.classList.remove('dark_theme');
    }

    document.body.classList.add(theme);
    dispatch(setTheme(theme));
  };

  //TODO: client system sttings
  // useEffect(() => {
  //   const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
  //   prefersDarkMode.addEventListener("change", handleSwitcheTheme);
  // }, []);

  return (
    <div
      style={{cursor: 'pointer'}}
      onClick={() => handleSwitcheTheme(app.currentTheme == 'dark_theme' ? 'light_theme' : 'dark_theme')}
    >
      {app.currentTheme == 'light_theme' && (
        <motion.div
          initial={{rotate: -90, scale: 0.8, opacity: 0.5}}
          animate={{rotate: 0, scale: 1, opacity: 1}}
          transition={{duration: 0.5}}
        >
          <TbMoonFilled size={20} />
        </motion.div>
      )}
      {app.currentTheme == 'dark_theme' && (
        <motion.div
          initial={{rotate: 90, scale: 0.8, opacity: 0.5}}
          animate={{rotate: 0, scale: 1, opacity: 1}}
          transition={{duration: 0.5}}
        >
          <MdSunny size={22} />
        </motion.div>
      )}
    </div>
  );
};
export default ThemeSwitcher;
