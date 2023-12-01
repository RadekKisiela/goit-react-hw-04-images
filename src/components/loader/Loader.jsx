import React from 'react';
import css from './Loader.module.css';

class Loader extends React.Component {
  render() {
    return (
      <div className={css.Loader}>
        <div className={css.LoaderSpinner}></div>
      </div>
    );
  }
}

export default Loader;
