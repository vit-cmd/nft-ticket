import React from 'react';

//INTERNAL IMPORT
import Style from './Button.module.css';

export const Button = (props: {
  btnName: string;
  handleClick: any;
  icon?: any;
  classStyle?: string;
}) => {
  return (
    <div className={Style.box}>
      <button
        className={`${Style.button} ${props.classStyle}`}
        onClick={() => props.handleClick()}
      >
        {props.icon}
        {''}
        {props.btnName}
      </button>
    </div>
  );
};
