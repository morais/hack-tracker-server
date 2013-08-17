App.Hack = DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  url: DS.attr('string'),
  status: DS.attr('string'),
  submission_date: DS.attr('date'),
  voters: DS.hasMany('App.User'),
  owner: DS.belongsTo('App.User')
});