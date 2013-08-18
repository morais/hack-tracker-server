App.Hack = DS.Model.extend
  title:       DS.attr 'string'
  description: DS.attr 'string'
  status:      DS.attr 'string'

  owner: DS.belongsTo 'App.User'


App.Hack.FIXTURES = [
  {id: 1, title: 'Some hack', description: 'A detailed bit of information'}
];