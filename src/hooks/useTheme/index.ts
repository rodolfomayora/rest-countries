import { useSelector } from 'react-redux';

import { selectTheme } from '../../store/rootSelectors'

const useTheme = (defaultStyle: string, lightStyle: string): string => {
  const currentTheme = useSelector(selectTheme);
  const themes = {
    default: defaultStyle,
    light: `${defaultStyle} ${lightStyle}`
  }
  
  return themes[currentTheme];
}

export default useTheme