App.Router.map ->
  @resource 'hacks', { path: '/' }

App.IndexRoute = Ember.Route.extend
  renderTemplate: ->
    @render 'index'

App.HacksRoute = Ember.Route.extend
  model: ->
    App.Hack.find()