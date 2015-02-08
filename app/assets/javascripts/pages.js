var MainView = Backbone.View.extend({
  el: 'body',

  events: {
    'submit #search': 'search'
  },

  search: function(e) {
    e.preventDefault();
    var query = this.$('.query').val();
    this.$('.query').val('');
    $.get('/search', {query: query}, function(data) {
      data.items.forEach(function(result) {
        var model = new ResultModel(result);

        var view = new ResultView({ 
          model: model,
          template: _.template(this.$('#result-template').html())
        });

        this.$('.results').append(view.render().el);
      })
    })
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
