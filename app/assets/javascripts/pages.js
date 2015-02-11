var MainView = Backbone.View.extend({
  initialize: function() {
    this.$results = this.$('.results');
    this.$notice = this.$('#notice');
    var channel = pusher.subscribe('twitter_handles');
    channel.bind('result', function(data) {
      var twitterHandle = data.twitter_handle;
      var model = this.collection.findWhere({display_name: data.name});

      if (twitterHandle) {
        model.set({ twitter_handle: twitterHandle });
      } else {
        model.trigger('change:twitter_handle');
      }
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
      this.$results.empty();
      this.$notice.empty();
      if (users.length) { this.renderResultViews(users); }
      else { this.$notice.html('<h1>No results found.</h1>'); }
    }.bind(this));
  },

  renderResultViews: function(users) {
    this.collection = new ResultsCollection(users);

    this.collection.each(function(model) {

      var view = new ResultView({
        model: model,
        template: _.template(this.$('#result-template').html())
      });

      this.$results.append(view.render().el);
    }, this);
  }
});

var ResultModel = Backbone.Model.extend({});

var ResultsCollection = Backbone.Collection.extend({
  model: ResultModel
});

var ResultView = Backbone.View.extend({
  initialize: function(options) {
    this.template = options.template;
    this.listenTo(this.model, 'change:twitter_handle', this.updateTwitterHandle);
  },

  updateTwitterHandle: function(model, twitterHandle) {
    var html = twitterHandle ? '<a href="' + 'https://twitter.com/' + twitterHandle + '">' + '@' + twitterHandle : 'Not Found.';
    this.$('.twitter-handle').html(html);
  },

  render: function() {
    var data = this.model.toJSON();
    this.setElement(this.template(data));
    return this;
  }
});

$(document).ready(function() {
  new MainView();
});
