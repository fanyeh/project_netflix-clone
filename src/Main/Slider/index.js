import React, { Component } from 'react';
import SliderHeader from './SliderHeader';
import SliderButton from './SliderButton';
import Slide from './Slide';
import classNames from 'classnames';
import api from '../../lib/apiServer';

class Slider extends Component {
  constructor(props) {
    super(props);
    this.totalSlides = [...props.sliderData[1].keys()];
    this.slideData = props.sliderData[1];
    this.imageBaseURL = props.sliderData[0];
    this.numOfTotalSlides = this.totalSlides.length;
    this.hoverTimeout = 300;
    this.slideTimeout = 800;
    this.sliderElement = React.createRef();
    this.transitionEndCallback = null;
    this.slidingCallback = null;
    this.transitionCount = 0;
    this.setVisibleCount();
    this.initSlider();

    /* States */
    this.state = {
      visibleSlides: this.setVisibleSlides(),
      isTransition: false,
      init: true,
      showLeftButton: false,
      showRightButton: true,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resetSlider);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resetSlider);
  }

  setVisibleCount = () => {
    const screenWidth = window.screen.width;
    this.visibleCount = screenWidth < 768 ? 2 : screenWidth < 1024 ? 3 : screenWidth < 1280 ? 4 : 6;
    this.controlButtonWidth = screenWidth < 768 ? 20 : screenWidth < 1024 ? 40 : 60;
    this.slideWidth = (screenWidth - this.controlButtonWidth * 2) / this.visibleCount - 3;
    this.slideHeight = this.slideWidth * 0.5625;
  };

  resetSlider = () => {
    this.setVisibleCount();
    this.initSlider();
    this.setState({
      init: true,
      visibleSlides: this.setVisibleSlides(),
      showRightButton: true,
      showLeftButton: false,
      isTransition: false,
    });
  };

  initSlider = () => {
    const remainSlides = this.numOfTotalSlides - this.visibleCount - 2;
    this.slidingOffset = remainSlides >= this.visibleCount ? this.visibleCount : remainSlides;

    if (this.slidingOffset < 1) {
      this.firstVisibleSlide = 2;
      this.lastVisibleSlide = this.visibleCount + 1;
    } else {
      this.firstVisibleSlide = this.slidingOffset + 1;
      this.lastVisibleSlide = this.visibleCount + this.slidingOffset;
    }

    this.firstSlide = this.firstVisibleSlide - 1;
    this.lastSlide = this.lastVisibleSlide + 1;

    this.slidePropsBase = {
      first: this.firstVisibleSlide,
      last: this.lastVisibleSlide,
      width: this.slideWidth,
      height: this.slideHeight,
      hoverTimeout: this.hoverTimeout,
    };
  };

  componentDidUpdate() {
    /* To guarantee when slide is going to transition , ph are updated */
    if (this.slidingCallback) {
      this.slidingCallback();
      this.slidingCallback = null;
    }
  }

  setVisibleSlides = () => {
    if (this.numOfTotalSlides < this.visibleCount) {
      return this.totalSlides;
    } else {
      const numOfPlaceHolders = this.slidingOffset < 1 ? 1 : this.slidingOffset;
      const visibleSlides = this.totalSlides.slice(0, this.visibleCount + 1);
      const placeHolder = Array(numOfPlaceHolders).fill('ph');
      const newVisibleSlides = ['ph'].concat(placeHolder, visibleSlides, placeHolder);
      return newVisibleSlides;
    }
  };

  /* Sliding Right */
  slideRightHandler = () => {
    this.updatePlaceHolder(this.lastSlide, 1, this.rightPlaceHolderRule());
    this.slidingCallback = () => {
      const updater = this.slideUpdater(this.slideRightUpdateRule());
      const transitionValue = this.slidingOffset < 1 ? -100 : this.slidingOffset * -100;
      this.prepareSlideTransition(transitionValue, updater);
    };
  };

  slideRightUpdateRule = () => {
    const { visibleSlides } = this.state;
    return (slideIndex, index) => {
      if (this.slidingOffset < 1) {
        return slideIndex === this.totalSlides[this.numOfTotalSlides - 1]
          ? 'ph'
          : slideIndex === 'ph'
            ? visibleSlides[index + 1]
            : slideIndex + 1;
      } else {
        return slideIndex === 'ph'
          ? visibleSlides[index + this.slidingOffset]
          : (slideIndex + this.slidingOffset) % this.numOfTotalSlides;
      }
    };
  };

  rightPlaceHolderRule = () => {
    return this.slidingOffset < 1
      ? lastIndex => lastIndex + 1
      : (lastIndex, i) => (lastIndex + i) % this.numOfTotalSlides;
  };

  /* Sliding Left */
  slideLeftHandler = () => {
    this.updatePlaceHolder(this.firstSlide, -1, this.leftPlaceHolderRule());
    this.slidingCallback = () => {
      const updater = this.slideUpdater(this.slideLeftUpdateRule());
      const transitionValue = this.slidingOffset < 1 ? 100 : this.slidingOffset * 100;
      this.prepareSlideTransition(transitionValue, updater);
    };
  };

  slideLeftUpdateRule = () => {
    return (slideIndex, index) => {
      if (this.slidingOffset < 1) {
        return slideIndex === this.totalSlides[0]
          ? 'ph'
          : slideIndex === 'ph'
            ? this.state.visibleSlides[index - 1]
            : slideIndex - 1;
      } else {
        let newIndex = slideIndex - this.slidingOffset;
        return newIndex < 0 ? newIndex + this.numOfTotalSlides : newIndex;
      }
    };
  };

  leftPlaceHolderRule = () => {
    return this.slidingOffset < 1
      ? lastIndex => lastIndex - 1
      : (lastIndex, i) => {
          let value = lastIndex - i;
          return value < 0 ? value + this.numOfTotalSlides : value;
        };
  };

  /* Update place holder before sliding */
  updatePlaceHolder = (endSlide, direction, updateRule) => {
    let newVisibleSlides = this.state.visibleSlides.slice();
    const lastIndex = newVisibleSlides[endSlide];

    /* Replace placeholder elements with next showing slides */
    if (
      this.slidingOffset < 1 &&
      lastIndex !== this.totalSlides[this.numOfTotalSlides - 1] &&
      lastIndex !== this.totalSlides[0]
    ) {
      newVisibleSlides[endSlide + 1 * direction] = updateRule(lastIndex);
    } else {
      for (let i = 1; i <= this.slidingOffset; i++) {
        newVisibleSlides[endSlide + i * direction] = updateRule(lastIndex, i);
      }
    }

    /* Update slides to view  */
    requestAnimationFrame(() => {
      this.setState(prevState => ({
        isTransition: !prevState.isTransition,
        visibleSlides: newVisibleSlides,
        init: false,
      }));
    });
  };

  /* Create updater */
  slideUpdater = updaterRule => {
    const updater = (slideIndex, index) => {
      return index < this.firstSlide || index > this.lastSlide
        ? 'ph'
        : updaterRule(slideIndex, index);
    };
    return updater;
  };

  /* Sliding Transition */
  prepareSlideTransition = (transitionValue, updater) => {
    this.transitionEndCallback = () => {
      this.updateVisibleSlides(updater);
      this.removeSlideTransition();
    };
    this.performSlideTransition(transitionValue);
  };

  performSlideTransition = transitionValue => {
    requestAnimationFrame(() => {
      this.slideHandler(slide => {
        slide.style.transition = `all ${this.slideTimeout}ms`;
        slide.style.transform = `translateX(${transitionValue}%`;
      });
    });
  };

  removeSlideTransition = () => {
    this.slideHandler(slide => {
      slide.style.transition = ``;
      slide.style.transform = ``;
    });
  };

  updateVisibleSlides = cb => {
    const newVisibleSlides = this.state.visibleSlides.map(cb);
    this.setState(prevState => ({
      visibleSlides: newVisibleSlides,
      isTransition: !prevState.isTransition,
      showLeftButton: this.toggleLeftButton(newVisibleSlides),
      showRightButton: this.toggleRightButton(newVisibleSlides),
    }));
  };

  /* Transition end Handler for sliding */
  transitionEndHandler = e => {
    if (this.transitionEndCallback) {
      // Wait till all slides have done transition
      this.transitionCount += 1;
      if (this.transitionCount === this.state.visibleSlides.length) {
        this.transitionEndCallback();
        this.transitionCount = 0;
        this.transitionEndCallback = null;
      }
    }
  };

  /* Hover */
  hoverHandler = hoverSlideIndex => {
    const hoverSlideID = this.state.visibleSlides[hoverSlideIndex];
    this.slideHandler((slide, index) => {
      if (index !== hoverSlideIndex) {
        this.isHoverEndSlide(hoverSlideID)
          ? this.hoverEndSlideTransition(hoverSlideID, slide, index)
          : this.performHoverTransition(
              slide,
              index < hoverSlideIndex ? 'hoverToLeft' : 'hoverToRight',
              this.hoverTimeout,
            );
      }
    });
  };

  hoverEndSlideTransition = (hoverSlideID, slide, index) => {
    // Only transitioning slides on left or right hand side of hover slide
    if (this.isHoverLeftEndSlide(hoverSlideID) && index > this.firstVisibleSlide) {
      this.performHoverTransition(slide, 'hoverEndToRight', this.hoverTimeout);
    } else if (this.isHoverRightEndSlide(hoverSlideID) && index < this.lastVisibleSlide) {
      this.performHoverTransition(slide, 'hoverEndToLeft', this.hoverTimeout);
    }
  };

  isHoverEndSlide = slideID => {
    return this.isHoverLeftEndSlide(slideID) || this.isHoverRightEndSlide(slideID);
  };

  isHoverLeftEndSlide = slideID => {
    return slideID === this.state.visibleSlides[this.firstVisibleSlide];
  };

  isHoverRightEndSlide = slideID => {
    return slideID === this.state.visibleSlides[this.lastVisibleSlide];
  };

  performHoverTransition = (element, cssClass, timeout) => {
    let classList = element.classList;
    if (classList.contains(cssClass)) {
      classList.remove(cssClass);
    } else {
      element.style.transition = `all ${timeout}ms`;
      classList.add(cssClass);
    }
  };

  /* Sliding Handler */
  slideHandler = cb => {
    const slides = this.sliderElement.current.childNodes;
    slides.forEach(cb);
  };

  toggleLeftButton = visibleSlides => {
    return this.state.init ||
      (this.slidingOffset < 1 && visibleSlides[1] === 'ph') ||
      this.slidingOffset < -1
      ? false
      : true;
  };

  toggleRightButton = visibleSlides => {
    return visibleSlides[this.visibleCount + 2] === 'ph' || this.slidingOffset < -1 ? false : true;
  };

  getSlideProps = (slide, index) => {
    const { isTransition } = this.state;
    let slideProps = {
      key: `${index}-ph`,
      type: 'placeholder',
      movieData: '',
      imageBaseURL: '',
      hover: this.hoverHandler,
      isTransition: isTransition,
      pos: index,
      api: api.youtube,
    };
    if (slide !== 'ph') {
      slideProps.key = slide;
      slideProps.type = 'slide';
      slideProps.movieData = this.slideData[slide];
      slideProps.imageBaseURL = this.imageBaseURL;
    }

    return Object.assign({}, this.slidePropsBase, slideProps);
  };

  getControlButtonProps = direction => {
    const buttonClass = direction === 'left' ? 'left-0' : 'right-0';
    const handler = direction === 'left' ? this.slideLeftHandler : this.slideRightHandler;
    const iconClass = direction === 'left' ? 'fa-chevron-left' : 'fa-chevron-right';
    return {
      clickHandler: !this.state.isTransition ? handler : undefined,
      className: buttonClass,
      icon: iconClass,
      size: { width: this.controlButtonWidth, height: this.slideHeight },
    };
  };

  render() {
    const { visibleSlides, showLeftButton, showRightButton } = this.state;
    const sliderMargin = this.props.last ? 'mb6-l mb4-m mb3 ' : 'mb5-l mb3-m mb2';

    return (
      <div className={classNames('App w-100', sliderMargin, this.props.className)}>
        <SliderHeader marginLeft={this.controlButtonWidth} title={this.props.title} />
        <div className="w-100 relative slider">
          {/* Slides Wrapper */}
          <div
            className="flex justify-center"
            ref={this.sliderElement}
            onTransitionEnd={this.transitionEndHandler}
            style={{ height: `${this.slideHeight}px` }}
          >
            {visibleSlides.map((slide, index) => <Slide {...this.getSlideProps(slide, index)} />)}
          </div>
          {showLeftButton && <SliderButton {...this.getControlButtonProps('left')} />}
          {showRightButton && <SliderButton {...this.getControlButtonProps('right')} />}
        </div>
      </div>
    );
  }
}

export default Slider;
