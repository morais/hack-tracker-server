hackdapter = DS.RESTAdapter.extend
  url: "http://murmuring-fortress-9026.herokuapp.com"

App.Store = DS.Store.extend
  revision: 13
  adapter: hackdapter.create()