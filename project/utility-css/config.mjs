export default {
  theme: {
    spacing: {
      px: '1px',
      0: '0px',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      11: '2.75rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
    },
    initMaxHeight: function () {
      this.maxHeight = {
        ...this.spacing,
        full: '100%',
        screen: '100vh',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
      };
      delete this.initMaxHeight;
      return this;
    },
    maxWidth: {
      none: 'none',
      0: '0rem',
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      '7xl': '80rem',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
      prose: '65ch',
    },
    minHeight: {
      0: '0px',
      full: '100%',
      screen: '100vh',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
    },
    minWidth: {
      0: '0px',
      full: '100%',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
    },
  },
  syntax: {
    w: {
      keys: ['width'],
      sizes: 'spacing',
    },
    h: {
      keys: ['height'],
      sizes: 'spacing',
    },
    'min-w': {
      keys: ['min-width'],
      sizes: 'minWidth',
    },
    'min-h': {
      keys: ['min-height'],
      sizes: 'minHeight',
    },
    'max-w': {
      keys: ['max-width'],
      sizes: 'maxWidth',
    },
    'max-h': {
      keys: ['max-height'],
      sizes: 'maxHeight',
    },
    p: {
      keys: ['padding'],
      sizes: 'spacing',
      variants: ['all-position'],
    },
    m: {
      keys: ['margin'],
      sizes: 'spacing',
      variants: ['all-position'],
    },
  },
  variants: {
    t: ['top'],
    b: ['bottom'],
    l: ['left'],
    r: ['right'],
    x: ['left', 'right'],
    y: ['top', 'bottom'],
    initAll: function () {
      this['all-position'] = ['t', 'b', 'l', 'r', 'x', 'y'];
      delete this.initAll;
      return this;
    },
  },
  /** Initialization function to call all nested init functions. Each function must delete itself before returning. **/
  init: function () {
    this.theme.initMaxHeight();
    this.variants.initAll();

    delete this.init;
    return this;
  },
}.init();
