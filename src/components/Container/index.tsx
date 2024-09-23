import type { ReactNode } from 'react';
import style from './style.module.scss';

type Props = { children: ReactNode }

export function Container ({ children }: Props) {
  return <div className={style.Container}>{children}</div>
}