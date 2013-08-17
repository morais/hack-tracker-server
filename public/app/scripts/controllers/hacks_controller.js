App.HacksController = Ember.ArrayController.extend({

  createHack: function () {
    var title = this.get('newTitle');
    var description = this.get('newDescription');

    var hack = App.Hack.createRecord({
      title: title,
      description: description
    });

    hack.save();
  }

});