App.User = DS.Model.extend
  name:       DS.attr 'string'
  avatar_url: DS.attr 'string'

  hacks: DS.hasMany 'App.Hack'