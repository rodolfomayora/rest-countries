import React, { FC, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { selectTheme } from '../../store/rootSelectors';
import { toggleTheme } from '../../store/rootActions';
import { MoonIconFill, MoonIconOutline } from '../../assets/images';
import style from './style.module.scss';

const ToggleThemeButton: FC = () => {

  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(toggleTheme());

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name=theme-color]');

    if (currentTheme === 'default') metaThemeColor?.setAttribute('content', 'hsl(209, 23%, 22%)');
    if (currentTheme === 'light') metaThemeColor?.setAttribute('content', 'hsl(0, 0%, 100%)');

  },
  [currentTheme])

  const themes = {
    default: style.ToggleThemeButton,
    light: `${style.ToggleThemeButton} ${style.light}`
  }

  const isDefault: boolean = currentTheme === 'default';

  return (
    <button className={themes[currentTheme]}
      onClick={handleClick}
    >
      {isDefault
      ? <MoonIconFill className={style.icon} /> 
      : <MoonIconOutline className={style.icon} />}
      
      <span className={style.text}>Dark Mode</span>
    </button>
  )
}

export default ToggleThemeButton;