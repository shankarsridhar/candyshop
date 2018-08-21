import Controller from '@ember/controller';
import { get, set, computed, observer } from '@ember/object';

export default Controller.extend({
  // DEMO[3]: BAD - Observer vs computed properties
  amountSavedObs: observer('model.cartItems.@each.{originalPrice,price,qty}', function() {
    console.log('totalSavings - Observer');
    // TODO: can we listen to `isOnSale` as well, to amplify the problem with observer ?
    let _totalAmountSaved = 0;
    const cartItems = get(this, 'model.cartItems');
    cartItems.forEach(item => {
      _totalAmountSaved += (item.originalPrice - item.price) * item.qty;
    });
    _totalAmountSaved = _totalAmountSaved.toFixed(2);
    this.set('totalSavings', _totalAmountSaved);
  }),

  // DEMO[3]: GOOD - Observer vs computed properties
  /* totalSavings: computed('model.cartItems.@each.{originalPrice,price,qty}', function() {
    console.log('totalSavings - Computed Property');
    let _totalAmountSaved = 0;
    const cartItems = get(this, 'model.cartItems');
    cartItems.forEach(item => {
      _totalAmountSaved += (item.originalPrice - item.price) * item.qty;
    });
    _totalAmountSaved = _totalAmountSaved.toFixed(2);
    return _totalAmountSaved;
  }), */

  totalAmount: computed('model.cartItems.@each.{qty,price}', function() {
    const cartItems = get(this, 'model.cartItems');
    let _totalAmount = 0;
    cartItems.forEach(item => (_totalAmount += item.qty * item.price));
    return _totalAmount;
  }),

  // DEMO[2.2]: BAD - listening to `model.cartItems.[]` vs `model.cartItems`
  /* uniqueChocolatesCount: computed('model.cartItems', function() {
    return this.get('model.cartItems.length');
  }), */

  // DEMO[2.2]: GOOD - listening to `model.cartItems.[]` vs `model.cartItems`
  uniqueChocolatesCount: computed('model.cartItems.[]', function() {
    return this.get('model.cartItems.length');
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

        // DEMO[2.1]: BAD - KVO
        /* cartItems.push(newCandyLineItem);
        console.log(cartItems); */

        // DEMO[2.1]: GOOD - KVO
        cartItems.pushObject(newCandyLineItem);
      }
    },

    resetCart() {
      this.set('model.cartItems', []);
    }
  }
});
