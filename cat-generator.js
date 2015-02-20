this.Cats = new Mongo.Collection('cats');

Meteor.methods({
  generateCat: function() {
    if (! Meteor.isClient) {
      HTTP.get('http://thecatapi.com/api/images/get?format=src&type=gif', {
        followRedirects: false
      }, function(error, response) {
        if (! error) {
          var url = response.headers.location;
            Cats.insert({
              generatedUrl: url
            });
          }
      });
    }
  }
});

if (Meteor.isClient) {
  Template.catList.helpers({
    cats: function() {
      return Cats.find({});
    }
  });

  Template.generateCat.events({
    'click .generate-cat': function(e, template) {
      Meteor.call('generateCat');
    }
  });
}
