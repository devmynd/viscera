(function() {
  var _super = Array.prototype.map;
  function createIterator(property) {
    return function(item) {
      return _.result(item, property);
    };
  }

  Array.prototype.map = function(iterator, context) {
    context = context || this;
    if (!_.isString(iterator)) return _super.call(this, iterator, context);
    var property = iterator.replace(/^&/, '');
    return _super.call(this, createIterator(property), context);
  };

  _.map = function(obj, iterator, context) {
    if (!_.isString(iterator)) return _super.call(obj, iterator, arguments);
    var property = iterator.replace(/^&/, '');
    return _super.call(obj, createIterator(property), context);
  };
})();

(function() {
  _.bindALL = function(obj) {
    _(obj).functions().each(function(method) {
      var func = obj[method];
      obj[method] = function() {
        return func.apply(obj, arguments);
      };
    });
  };
})();

Object.defineProperty(Array.prototype, "second", {
  writeable: false,
  configurable: false,
  enumerable: false,
  value: function() {
    return this[1];
  }
});

Object.defineProperty(Array.prototype, "third", {
  writeable: false,
  configurable: false,
  enumerable: false,
  value: function() {
    return this[2];
  }
});


String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.humanize = function() {
  return this.replace(/([A-Z])/g, " $1").replace(/-|_/g, ' ').replace(/^\s?/, "");
};

String.prototype.hyphenate = function() {
  return this.replace(/([A-Z])/g, " $1").toLowerCase().replace(/\s|_/g, '-').toLowerCase();
};

String.prototype.isBlank = function() {
  return this.length === 0;
};

String.prototype.isPresent = function() {
  return this.length > 0;
};

String.prototype.titleCase = function() {
  return this.replace(/([A-Z])/g, " $1").replace(/_|-/g, " ").split(/\s/).map(function(word) {
    return word.capitalize();
  }).join(" ");
};

String.prototype.toNumber = function() {
  return parseInt(this, 10);
};

String.prototype.truncate = function(length) {
  return (this.length > length) ? this.substring(0, length) + '...' : this;
};

String.prototype.camelize = function() {
  return this.split(/_|-|\s/g).map(function(part, i) {
    return (i > 0) ? part.capitalize() : part.toLowerCase();
  }).join('');
};

String.prototype.constantize = function() {
  return this.camelize().capitalize();
};

String.prototype.underscore = function() {
  return this.replace(/([A-Z])/g, " $1").replace(/^\s?/, '').replace(/-|\s/g, "_").toLowerCase();
};
