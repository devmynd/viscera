Viscera.Views.AppCollections = Backbone.View.extend({
  template: JST["vendor/viscera/skin/app_collections"],

  initialize: function() {
    this.render();
  },

  render: function () {
    this.$el.html(this.template({ collections: this.collection }));
  },
});
