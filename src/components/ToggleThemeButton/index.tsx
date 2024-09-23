// import { useTheme } from '../../hooks';
import { MoonIconFill, MoonIconOutline } from '../../assets/images';
import style from './style.module.scss';

export function ToggleThemeButton () {
  // const currentTheme = useSelector(selectTheme);
  // const isDefault: boolean = currentTheme === 'default';

  // const dispatch = useDispatch();
  // const handleClick = () => dispatch(toggleTheme());

  // const toggleThemeButtonStyle: string = useTheme(style.ToggleThemeButton, style.light);

  return (
    // <button className={toggleThemeButtonStyle} onClick={handleClick}>
    <button className={style.ToggleThemeButton} onClick={() => {}}>
      {/* {isDefault
      ? <MoonIconFill className={style.icon} /> 
      : <MoonIconOutline className={style.icon} />} */}
      <MoonIconFill className={style.icon} />
      <span className={style.text}>Dark Mode</span>
    </button>
  )
}