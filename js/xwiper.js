const defaults = {
  threshold: 50,
  passive: false
};

class Xwiper {
  constructor(element, options = {}) {
    this.options = { ...defaults, ...options };

    this.element = null;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.onSwipeLeftAgent = null;
    this.onSwipeRightAgent = null;
    this.onSwipeUpAgent = null;
    this.onSwipeDownAgent = null;
    this.onTapAgent = null;

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.onSwipeRight = this.onSwipeRight.bind(this);
    this.onSwipeUp = this.onSwipeUp.bind(this);
    this.onSwipeDown = this.onSwipeDown.bind(this);
    this.onTap = this.onTap.bind(this);
    this.destroy = this.destroy.bind(this);
    this.handleGesture = this.handleGesture.bind(this);

    let eventOptions = this.options.passive ? { passive: true } : false;

    this.element = (element instanceof EventTarget) ? element : document.querySelector(element);
    
    this.element.addEventListener(
      'touchstart',
      this.onTouchStart,
      eventOptions
    );
    this.element.addEventListener('touchend', this.onTouchEnd, eventOptions);
  }

  onTouchStart(event) {
    this.touchStartX = event.changedTouches[0].screenX;
    this.touchStartY = event.changedTouches[0].screenY;
  }

  onTouchEnd(event) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.touchEndY = event.changedTouches[0].screenY;
    this.handleGesture();
  }

  onSwipeLeft(func) {
    this.onSwipeLeftAgent = func;
  }
  onSwipeRight(func) {
    this.onSwipeRightAgent = func;
  }
  onSwipeUp(func) {
    this.onSwipeUpAgent = func;
  }
  onSwipeDown(func) {
    this.onSwipeDownAgent = func;
  }
  onTap(func) {
    this.onTapAgent = func;
  }

  destroy() {
    this.element.removeEventListener('touchstart', this.onTouchStart);
    this.element.removeEventListener('touchend', this.onTouchEnd);
  }

  handleGesture() {
    /**
     * swiped left
     */
    if (this.touchEndX + this.options.threshold <= this.touchStartX) {
      this.onSwipeLeftAgent && this.onSwipeLeftAgent();
      return 'swiped left';
    }

    /**
     * swiped right
     */
    if (this.touchEndX - this.options.threshold >= this.touchStartX) {
      this.onSwipeRightAgent && this.onSwipeRightAgent();
      return 'swiped right';
    }

    /**
     * swiped up
     */
    if (this.touchEndY + this.options.threshold <= this.touchStartY) {
      this.onSwipeUpAgent && this.onSwipeUpAgent();
      return 'swiped up';
    }

    /**
     * swiped down
     */
    if (this.touchEndY - this.options.threshold >= this.touchStartY) {
      this.onSwipeDownAgent && this.onSwipeDownAgent();
      return 'swiped down';
    }

    /**
     * tap
     */
    if (this.touchEndY === this.touchStartY) {
      this.onTapAgent && this.onTapAgent();
      return 'tap';
    }
  }
}