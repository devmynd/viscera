Viscera.Models.EventInstance = Backbone.Model.extend({
  defaults: {
    triggerCount: 0,
    registerCount: 0
  },

  incrementRegisterCount: function() {
    this.set("registerCount", this.get("registerCount") + 1);
    Viscera.Logger.log("+1 registered for the " + this.get("name") + " event", "event");
    return this;
  },

  decrementRegisterCount: function() {
    this.set("registerCount", this.get("registerCount") - 1);
    Viscera.Logger.log("-1 registered for the " + this.get("name") + " event (" + this.get("registerCount") + ")", "event");
    return this;
  }
});
