import Controller from '@ember/controller';
import { get, set, computed } from '@ember/object';

export default Controller.extend({
  appName: 'The Candy Shop',

  uniqueChocolatesCount: computed('model.cartItems.[]', function() {
    return get(this, 'model.cartItems.length');
  }),

  totalChocolatesCount: computed('model.cartItems.[]', function() {
    const cartItems = get(this, 'model.cartItems');
    let _totalChocolatesCount = 0;
    cartItems.forEach(item => {
      _totalChocolatesCount += item.qty;
    });
    return _totalChocolatesCount;
  }),

  actions: {
    addToCart(candyId) {
      const cartItems = get(this, 'model.cartItems');
      const targetCandy = cartItems.findBy('id', candyId);

      if (targetCandy) {
        const qty = get(targetCandy, 'qty');
        set(targetCandy, 'qty', qty + 1);
      } else {
        const catalogue = get(this, 'model.candies');
        const newCandyLineItem = catalogue.findBy('id', candyId);
        set(newCandyLineItem, 'qty', 1);
        cartItems.pushObject(newCandyLineItem);
      }
    }
  }
});
