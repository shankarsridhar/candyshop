import Controller from '@ember/controller';
import { get, set, computed, observer } from '@ember/object';

export default Controller.extend({
  appName: 'The Candy Shop',

  totalAmount: computed('model.cartItems.@each.{qty,price,isOnSale}', function() {
    const cartItems = get(this, 'model.cartItems');
    let _totalAmount = 0;
    cartItems.forEach(item => (_totalAmount += item.qty * item.price));
    return _totalAmount;
  }),

  // DEMO [2]: BAD - Observer
  /* amountSavedObs: observer('model.cartItems.@each.{originalPrice,price,qty,isOnSale}', function() {
    console.log('amountSavedObs ran at ', new Date());
    // TODO: can we listen to `isOnSale` as well, to amplify the problem with observer ?
    let _totalAmountSaved = 0;
    const cartItems = get(this, 'model.cartItems');
    cartItems.forEach(item => {
      _totalAmountSaved += (item.originalPrice - item.price) * item.qty;
    });
    _totalAmountSaved = _totalAmountSaved.toFixed(2);
    this.set('totalSavings', _totalAmountSaved);
  }), */

  // DEMO [2]: GOOD - Observer
  totalSavings: computed('model.cartItems.@each.{originalPrice,price,qty}', function() {
    console.log('totalSavings CP');
    let _totalAmountSaved = 0;
    const cartItems = get(this, 'model.cartItems');
    cartItems.forEach(item => {
      _totalAmountSaved += (item.originalPrice - item.price) * item.qty;
    });
    _totalAmountSaved = _totalAmountSaved.toFixed(2);
    return _totalAmountSaved;
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

        // DEMO[3]: BAD - KVO
        cartItems.push(newCandyLineItem);

        // DEMO[3]: GOOD - KVO
        /* cartItems.pushObject(newCandyLineItem); */

        console.log(cartItems);
      }
    },

    resetCart() {
      this.set('model.cartItems', []);
    }
  }
});
