import React from 'react';
import styles from './Button.module.scss';


interface ButtonProps {
  title: string;
  color: string;
}

export default function Button({title, color}: ButtonProps) {
  return (
    <button className={`${styles.container} ${styles[color]}`}>
      {title}
    </button>
  );
}
