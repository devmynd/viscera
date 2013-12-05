Viscera.Models.ViewInstance = Backbone.Model.extend({
  defaults: {
    renderCount: 0,
    type: "view"
  },

  initialize: function(options) {
    var _this = this;
    if (options.instance.prototype.render) {
      var _super = options.instance.prototype.render;
      options.instance.prototype.render = function() {
        var count = _this.get("renderCount") + 1;
        _this.set("renderCount", count);
        return _super.apply(this, arguments);
      };
    }
  }
});
