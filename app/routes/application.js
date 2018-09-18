import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    this._super(...arguments);

    return {
      candies: [
        {
          id: '1',
          name: 'Ferrero',
          url: 'http://i64.tinypic.com/mjn2h5.jpg',
          price: 10,
          originalPrice: 10,
          isOnSale: true
        },
        {
          id: '2',
          name: 'Lindt',
          url: 'http://i66.tinypic.com/35byq6h.jpg',
          price: 8,
          originalPrice: 8,
          isOnSale: false
        },
        {
          id: '3',
          name: 'Hersheys',
          url: 'http://i68.tinypic.com/2vtbi3m.jpg',
          price: 8,
          originalPrice: 8,
          isOnSale: true
        },
        {
          id: '4',
          name: 'Kisses',
          url: 'http://i66.tinypic.com/35byq6h.jpg',
          price: 10,
          originalPrice: 10,
          isOnSale: false
        }
      ],

      cartItems: []
    };
  }
});
