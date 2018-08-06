import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    this._super(...arguments);

    return {
      candies: [
        {
          id: '1',
          name: 'Ferrero',
          url: 'assets/ferrero.jpg',
          price: 10
        },
        {
          id: '2',
          name: 'Lindt',
          url: 'assets/lindt.jpeg',
          price: 8
        },
        {
          id: '3',
          name: 'Hersheys',
          url: 'assets/hersheys.jpg',
          price: 8
        },
        {
          id: '4',
          name: 'Kisses',
          url: 'assets/kisses.jpeg',
          price: 10
        }
      ],

      cartItems: []
    };
  }
});
