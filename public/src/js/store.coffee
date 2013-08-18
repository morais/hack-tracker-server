hackdapter = DS.RESTAdapter.extend
  url: "http://localhost:3000"

App.Store = DS.Store.extend
  revision: 13
  adapter: hackdapter.create()