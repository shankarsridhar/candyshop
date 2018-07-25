import Controller from '@ember/controller';
import { get, set, computed, observer } from '@ember/object';

export default Controller.extend({
  appName: 'The Candy Shop',

  uniqueChocolatesCount: computed('model.cartItems.[]', function() {
    return get(this, 'model.cartItems.length');
  }),

  totalChocolatesCount: computed('model.cartItems.@each.qty', function() {
    const cartItems = get(this, 'model.cartItems');
    let _totalChocolatesCount = 0;
    cartItems.forEach(item => {
      _totalChocolatesCount += item.qty;
    });
    return _totalChocolatesCount;
  }),

  totalAmount: computed('model.cartItems.@each.qty', function() {
    const cartItems = get(this, 'model.cartItems');
    let _totalAmount = 0;
    cartItems.forEach(item => (_totalAmount += item.qty * item.price));
    return _totalAmount;
  }),

  /* totalAmountObserver: observer('model.cartItems.@each.qty', function() {
    console.log('_totalAmount');
    const cartItems = get(this, 'model.cartItems');
    let _totalAmount = 0;
    cartItems.forEach(item => (_totalAmount += item.qty * item.price));
    set(this, 'totalAmount', _totalAmount);
  }), */

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
