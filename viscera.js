_(Viscera).extend({
  initialize: function(app) {
    _.bindAll(this, "installComponent");
    this.App = app;
    this.install();
    return this;
  },

  install: function() {
    this.registerComponents();
    this.wrapEvents();
    this.wrapTrigger();
    return this.App;
  },

  registerComponents: function() {
    Viscera.Components = new Viscera.Collections.Components;
    ["model", "collection", "view"].each(this.installComponent);
  },

  installComponent: function(component) {
    var componentClass = (component.constantize() + "s").replace(/ss$/, 's');
    _(this.App[componentClass]).each(function(comp, componentName) {
      var _super = comp.prototype.initialize;
      comp.prototype.initialize = function() {
        Viscera.Components.add(new Viscera.Models[component.constantize() + "Instance"]({ name: componentName, instance: comp }));
        Viscera.Logger.log("new " + componentName + " " + component + " initialized");
        return _super.apply(this, arguments);
      };
    });
  },

  wrapTrigger: function() {
    var _super = this.App.Dispatcher.trigger;
    this.App.Dispatcher.trigger = function(eventName, eventData) {
      _super.apply(this, arguments);
      var eventInstance = Viscera.EventInstances.where({ name: eventName }).first();
      if (eventInstance) {
        eventInstance.set("triggerCount", eventInstance.get("triggerCount") + 1);
        // TODO make each trigger a model for more rich information
        Viscera.Logger.log(eventName + " event was triggered", "event");
      }
    };
  },

  wrapEvents: function() {
    Viscera.EventInstances = new Viscera.Collections.EventInstances;
    this.wrapBindMethods();
    this.wrapUnbindMethods();
  },

  wrapBindMethods: function() {
    ["on",  "listenTo", "once", "listentToOnce", "bind"].each(function(method) {
      var _super = this.App.Dispatcher[method];
      this.App.Dispatcher[method] = function(eventName, eventHandler, context) {
        _super.apply(this, arguments);
        var eventInstance = Viscera.EventInstances.where({ name: eventName }).first();
        if (!eventInstance) {
          eventInstance = new Viscera.Models.EventInstance({ name: eventName, handler: eventHandler, context: context });
          Viscera.EventInstances.add(eventInstance);
        }
        eventInstance.incrementRegisterCount();
      };
    });
  },

  wrapUnbindMethods: function() {
    ["off", "stopListening", "unbind"].each(function(method) {
      var _super = this.App.Dispatcher[method];
      this.App.Dispatcher[method] = function(eventName) {
        _super.apply(this, arguments);
        var eventInstance = Viscera.EventInstances.where({ name: eventName }).first();
        eventInstance.decrementRegisterCount();
        if (eventInstance.get("registerCount") < 1) Viscera.EventInstances.remove(eventInstance);
      };
    });
  }
});

_.bindAll(Viscera, "initialize");
