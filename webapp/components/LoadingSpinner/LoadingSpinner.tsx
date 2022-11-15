import React from "react";
import Style from './LoadingSpinner.module.css';

export function LoadingSpinner() {
  return (
    <div className={Style.container}>
      <div className={Style.loading}>
      </div>
    </div>
  );
}