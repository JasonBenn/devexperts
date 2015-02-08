var MainView = Backbone.View.extend({
  initialize: function() {
    this.$results = this.$('.results');
    var channel = pusher.subscribe('twitter_handles');
    channel.bind('result', function(data) {
      var twitterHandle = data.twitter;
      this.collection.findWhere({display_name: data.name}).set({ twitterHandle: twitterHandle })
    }.bind(this));
  },

  el: 'body',

  events: {
    'submit #search': 'search'
  },

  search: function(e) {
    e.preventDefault();
    var query = this.$('.query').val();
    $.get('/search', {query: query}, function(users) {
      this.$results.empty()

      this.collection = new ResultsCollection(users);

      this.collection.each(function(model) {

        var view = new ResultView({
          model: model,
          template: _.template(this.$('#result-template').html())
        });

        this.$results.append(view.render().el);
      }, this)
    }.bind(this))
  }
})

var ResultModel = Backbone.Model.extend({});

var ResultsCollection = Backbone.Collection.extend({
  model: ResultModel
})

var ResultView = Backbone.View.extend({
  initialize: function(options) {
    this.template = options.template;
    this.listenTo(this.model, 'change:twitterHandle', this.updateTwitterHandle);
  },

  updateTwitterHandle: function(model, twitterHandle) {
    var html = twitterHandle ? '<a href="' + 'https://twitter.com/' + twitterHandle + '">' + '@' + twitterHandle : 'Not Found.'
    this.$('.twitter-handle').html(html);
  },

  render: function() {
    var data = this.model.toJSON();
    this.setElement(this.template(data));
    return this;
  }
})

$(document).ready(function() {
  new MainView();
})
