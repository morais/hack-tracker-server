App.Router.map(function () {
  this.resource('hacks', { path: '/' });
});

App.HacksRoute = Ember.Route.extend({
  model: function () {
    return App.Hack.find();
  }
});