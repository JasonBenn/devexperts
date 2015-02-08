var MainView = Backbone.View.extend({
  initialize: function() {
    this.$results = this.$('.results');
    var channel = pusher.subscribe('twitter_handles');
    channel.bind('result', function(data) {
      console.log('An event was triggered with message: ' + JSON.stringify(data));
    });
  },

  el: 'body',

  events: {
    'submit #search': 'search'
  },

  search: function(e) {
    e.preventDefault();
    var query = this.$('.query').val();
    $.get('/search', {query: query}, function(data) {
      this.$results.empty()

      data.items.forEach(function(result) {
        var model = new ResultModel(result);

        var view = new ResultView({ 
          model: model,
          template: _.template(this.$('#result-template').html())
        });


        // listen to pusher somehow
        this.$results.append(view.render().el);
      }, this)

      // find twitter handles for each user.
      // listen for pusher events, update appropriate entry when you find one.
    }.bind(this))
  }
})

var ResultModel = Backbone.Model.extend({});

var ResultView = Backbone.View.extend({
  initialize: function(options) {
    this.template = options.template;
  },

  render: function() {
    var data = this.model.toJSON();
    this.$el.html(this.template(data));
    return this;
  }
})

$(document).ready(function() {
  new MainView();
})
