Viscera.Collections.Components = Backbone.Collection.extend({
  ofType: function(type) {
    return new Viscera.Collections[type.constantize() + "Instances"](this.where({ type: type }));
  },

  modelCount: function() {
    return this.ofType("model").length;
  },

  collectionCount: function() {
    return this.ofType("collection").length;
  },

  viewCount: function() {
    return this.ofType("view").length;
  },

  mostRenderedView: function() {
    return _.max(this.ofType("view").models, function(view) { return view.get("renderCount"); });
  },

  mostRenderedViews: function() {
    return this.where({ type: "view", renderCount: this.mostRenderedView().get("renderCount") });
  },

  viewNames: function() {
    return this.ofType("view").map(function(view) { return view.get("name"); }).uniq();
  },

  modelNames: function() {
    return this.ofType("model").map(function(model) { return model.get("name"); }).uniq();
  },

  topView: function() {
    var views = {};
    this.ofType("view").each(function(view) {
      var viewName = view.get("name");
      if (views[viewName] && !viewName.match(/^Base/)) {
        views[viewName].count += 1;
      } else {
        views[viewName] = { name: viewName, count: 0 };
      }
    });
    return _.max(views, function(view) { return view.count; });
  },

  topCollection: function() {
    var collections = {};
    this.ofType("collection").each(function(collection) {
      var collectionName = collection.get("name");
      if (collections[collectionName] && !collectionName.match(/^Base/)) {
        collections[collectionName].count += 1;
      } else {
        collections[collectionName] = { name: collectionName, count: 0 };
      }
    });
    return _.max(collections, function(collection) { return collection.count; });
  },

  topModel: function() {
    var models = {};
    this.ofType("model").each(function(model) {
      var modelName = model.get("name");
      if (models[modelName] && !modelName.match(/^Base/)) {
        models[modelName].count += 1;
      } else {
        models[modelName] = { name: modelName, count: 0 };
      }
    });
    return _.max(models, function(model) { return model.count; });
  },

  collectionNames: function() {
    return this.ofType("collection").map(function(collection) { return collection.get("name"); }).uniq();
  }
});
