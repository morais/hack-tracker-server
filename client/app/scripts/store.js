var hackdapter = DS.RESTAdapter.extend({
  buildURL: function(record, suffix) {
    var s = this._super(record, suffix);
    return s + ".json";
  },
  url: "http://localhost:3000"
});

App.Store = DS.Store.extend({
  revision: 13,
  adapter: hackdapter.create()
});