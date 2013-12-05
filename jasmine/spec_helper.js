var eventStub;
var promiseStub;

beforeEach(function() {
  Viscera.Logger.enabled = false;
  eventStub = {
    preventDefault: jasmine.createSpy(),
    stopPropagation: jasmine.createSpy(),
    target: jasmine.createSpy(),
    keyCode: 13
  };

  promiseStub = jasmine.createSpy();
  promiseStub.abort = function() {};
  promiseStub.fail = function() {};
  promiseStub.done = function() {};
  promiseStub.always = function() {};
  spyOn(promiseStub, "abort").andReturn(promiseStub);
  spyOn(promiseStub, "fail").andReturn(promiseStub);
  spyOn(promiseStub, "done").andReturn(promiseStub);
  spyOn(promiseStub, "always").andReturn(promiseStub);

  return this.addMatchers({
    toBeTrue: function() {
      return this.actual === true;
    },

    toBeFalse: function() {
      return this.actual === false;
    },

    toHaveClass: function(className) {
      return this.actual.hasClass(className);
    },

    toHaveFocus: function() {
      // https://github.com/netzpirat/guard-jasmine/issues/48#issuecomment-6494826
      return this.actual.is(":focus") || (this.actual[0] === this.actual[0].ownerDocument.activeElement);
    },

    toHaveText: function(text) {
      return this.actual.text().trim().match(text);
    },

    toHaveId: function(id) {
      return !!(this.actual.attr && this.actual.attr("id") === id);
    },

    toBeHidden: function() {
      return !this.actual.is(":visible");
    },

    toBeVisible: function() {
      return this.actual.is(":visible");
    },

    toExist: function() {
      return this.actual.length > 0;
    },

    toBeObject: function() {
      if (typeof this.actual === "undefined") {
        return false;
      }
      else {
        return compareConstructor(this.actual.constructor, Object);
      }
    },

    toBeArray: function() {
      return compareConstructor(this.actual.constructor, Array);
    },

    toBeString: function() {
      return compareConstructor(this.actual.constructor, String);
    },

    toBeFunction: function() {
      return compareConstructor(this.actual, Function);
    },

    toBeTypeof: function(b) {
      return compareConstructor(this.actual, b);
    },

    toBeInstanceof: function (suspect) {
      return this.actual instanceof suspect;
    },

    toBeEmpty: function() {
      return this.actual.length === 0;
    },

    toBeNumber: function() {
      return compareConstructor(this.actual, Number);
    },

    toContain: function(item) {
      return this.actual.contains(item);
    },

    toBeJqueryWrapped: function(selector) {
      if (selector && this.actual && this.actual.selector !== selector) return false;
      return checkElementExistence(this.actual);
    },

    toBejQueryPromise: function() {
      return !!(
        this.actual.done &&
        this.actual.fail &&
        this.actual.always &&
        this.actual.error &&
        this.actual.complete &&
        this.actual.abort &&
        this.actual.success &&
        this.actual.abort);
    },

    toHaveChild: function(child) {
      return this.actual.find(child).length > 0;
    }
  });

  function compareConstructor(a, b) {
    if (typeof a === "undefined") {
      return false;
    }
    else {
      return a.constructor == b;
    }
  }

  function checkElementExistence(element) {
    if (typeof element === "undefined") return false;
    if (typeof element.selector === "undefined") return false;
    if (!element.length) return false;
    return compareConstructor(element, jQuery);
  }
});
