import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../../hooks';
import { selectTheme } from '../../store/rootSelectors';
import { toggleTheme } from '../../store/rootActions';
import { MoonIconFill, MoonIconOutline } from '../../assets/images';
import style from './style.module.scss';

export function ToggleThemeButton () {
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(toggleTheme());

  const isDefault: boolean = currentTheme === 'default';

  const toggleThemeButtonStyle: string = useTheme(style.ToggleThemeButton, style.light);

  return (
    <button className={toggleThemeButtonStyle}
      onClick={handleClick}
    >
      {isDefault
      ? <MoonIconFill className={style.icon} /> 
      : <MoonIconOutline className={style.icon} />}
      
      <span className={style.text}>Dark Mode</span>
    </button>
  )
}