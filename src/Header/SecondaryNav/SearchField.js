import React, { Component } from 'react';
import classNames from 'classnames';

class SearchField extends Component {
  render() {
    const { clickHandler, show, border, transitionEndHandler, elementRef } = this.props;
    const transitionStyle = {
      transition: `width ${show ? 300 : 150}ms`,
      width: show ? `250px` : '0px',
    };
    const borderStyle = show || border ? 'ba b--white' : '';
    return (
      <div
        className={classNames('dib pl2 pv1 white', borderStyle)}
        onTransitionEnd={transitionEndHandler}
      >
        <i className="fas fa-search f4 v-mid cp" onClick={clickHandler} />
        <input
          type="text"
          placeholder="name , actor , type"
          className="f5 pl2 bg-black searchField bg-transparent white"
          style={{ ...transitionStyle }}
          ref={elementRef}
          onBlur={clickHandler}
        />
      </div>
    );
  }
}

export default SearchField;
