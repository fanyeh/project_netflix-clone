import React, { Component } from 'react';
import classNames from 'classnames';
class ThumbnailIcon extends Component {
  transitionEndHandler = e => {
    e.stopPropagation();
  };

  render() {
    const { icon, className } = this.props;
    return (
      <div className={classNames('br-100 ba bw1 tc mb2 thumbnailButton', className)}>
        {icon ? (
          <i className={classNames('far white f5', icon)} />
        ) : (
          <span className="white f3 ">+</span>
        )}
      </div>
    );
  }
}

export default ThumbnailIcon;
