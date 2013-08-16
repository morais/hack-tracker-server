App.User = DS.Model.extend({
  name: DS.attr('string'),
  owned_hacks: DS.hasMany('App.Hack')
});