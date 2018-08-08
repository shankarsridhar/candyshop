import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'li',

  classNames: ['candy-item'],

  isDiscountAllowed: computed.and('discount.{couponNotUsed,percent}', 'isOnSale'),

  discountedPrice: computed('discount.percent', function() {
    const price = this.get('price');
    const discountPercent = this.get('discount.percent');
    return price * (1 - discountPercent);
  }),

  // DEMO: BAD - proto error
  /* discount: {
    couponNotUsed: true,
    percent: 0.1
  }, */

  init() {
    this._super(...arguments);

    // DEMO: [GOOD] - proto error
    this.set('discount', {
      couponNotUsed: true,
      percent: 0.1
    });
    /* you may notice that this.discount = { } works fine here
    this is ONLY possible in the init hook. Properties have their "finalized" values and become observable
    after all of the init()s have run. 
    Using this.discount = {} is a refactoring problem waiting to happen, because if you move that line to 
    a didInsertElement or some other hook, you will now be circumventing the KVO api.
    */
  },

  actions: {
    applyCoupon() {
      const discountedPrice = this.get('discountedPrice');
      this.set('isCouponApplied', true);
      this.set('discount.couponNotUsed', false);
      this.set('price', discountedPrice);
    }
  }
});
