import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'li',

  classNames: ['candy-item'],

  isDiscountAllowed: computed.and('discount.percent', 'isOnSale', 'couponNotUsed'),

  discountedPrice: computed('discount.percent', function() {
    const price = this.get('price');
    const discountPercent = this.get('discount.percent');
    return price * (1 - discountPercent);
  }),

  couponNotUsed: true,

  init() {
    this._super(...arguments);

    this.set('discount', {
      percent: 0.1
    });
  },

  actions: {
    applyCoupon() {
      const discountedPrice = this.get('discountedPrice');
      this.set('isCouponApplied', true);
      this.set('couponNotUsed', false);
      this.set('price', discountedPrice);
    }
  }
});
