App.HacksController = Ember.ArrayController.extend

  createHack: ->
    title = @get 'newTitle'
    desc  = @get 'newDescription'

    hack = App.Hack.createRecord
      title: title
      description: desc

    hack.save()