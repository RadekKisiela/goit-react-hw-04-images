import React from 'react';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.Loader}>
      <div className={css.LoaderSpinner}></div>
    </div>
  );
};

export default Loader;
