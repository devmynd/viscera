describe("Array extensions", function() {
  var array;
  beforeEach(function() {
    array = [1, 2, 3];
  });

  describe("second", function() {
    it("returns the second item in the array", function() {
      expect(array.second()).toEqual(2);
    });
  });

  describe("third", function() {
    it("returns the third item in the array", function() {
      expect(array.third()).toEqual(3);
    });
  });
});

describe("String extensions", function() {
  describe("capitalize", function() {
    it("capitalizes the string", function() {
      expect("hello".capitalize()).toEqual("Hello");
    });
  });

  describe("humanize", function() {
    it("removes dashes and underscores", function() {
      expect("this-is_a-test_string".humanize()).toEqual("this is a test string");
    });

    it("adds spaces to camelCase words", function() {
      expect("ThisIsATestString".humanize()).toEqual("This Is A Test String");
    });
  });

  describe("hyphenate", function() {
    it("replaces spaces and underscores with hyphens", function() {
      expect("this is a test_string".hyphenate()).toEqual("this-is-a-test-string");
    });

    it("hyphenates camelCase words", function() {
      expect("thisIsATestString".hyphenate()).toEqual("this-is-a-test-string");
    });
  });

  describe("underscore", function() {
    it("replaces spaces and hyphens with underscores", function() {
      expect("this is a test-string".underscore()).toEqual("this_is_a_test_string");
    });

    it("works on camel case words", function() {
      expect("ThisIsATestString".underscore()).toEqual("this_is_a_test_string");
    });
  });

  describe("isBlank", function() {
    it("determines if a string is blank", function() {
      expect("".isBlank()).toBeTrue();
      expect("hello".isBlank()).toBeFalse();
    });
  });

  describe("isPresent", function() {
    it("determines if the string is not blank", function() {
      expect("".isPresent()).toBeFalse();
      expect("hello".isPresent()).toBeTrue();
    });
  });

  describe("title case", function() {
    it("title cases a string", function() {
      expect("this is a test string".titleCase()).toEqual("This Is A Test String");
    });
  });

  describe("toNumber", function() {
    it("turns an integer string to a number", function() {
      expect("1".toNumber()).toEqual(1);
    });
  });

  describe("truncate", function() {
    it("truncates a string at given length", function() {
      expect("this is a test string".truncate(7)).toEqual("this is...");
    });
  });

  describe("camelize", function() {
    it("it translates a string to camel case", function() {
      expect("this is-a-test_string".camelize()).toEqual("thisIsATestString");
    });
  });

  describe("constantize", function() {
    it("creates a constant string", function() {
      expect("this is a test string".constantize()).toEqual("ThisIsATestString");
    });
  });

  describe("map", function() {
    var objects;
    beforeEach(function() {
      objects = [{
        id: 1,
        name: "one",
        age: function() {
          return this.id + 10;
        }
      }, {
        id: 2,
        name: "two",
        age: function() {
          return this.id + 10;
        }
      },
      {
        id: 3,
        name: "three",
        age: function() {
          return this.id + 10;
        }
      }];
    });

    it("can map over objects and access properties via special syntax", function() {
      expect(objects.map("&id")).toEqual([1, 2, 3]);
      expect(objects.map("&name")).toEqual(["one", "two", "three"]);
      expect(objects.map("&age")).toEqual([11, 12, 13]);

      expect(_.map(objects, "&id")).toEqual([1, 2, 3]);
      expect(_.map(objects, "&name")).toEqual(["one", "two", "three"]);
      expect(_.map(objects, "&age")).toEqual([11, 12, 13]);
    });
  });

  describe("_.bindALL", function() {
    it("actually binds all the methods to the instance", function() {
      var obj = {
        hello: function() {},
        id: 20,
        goodbye: function() {},
        context: function() {
          return this.id;
        }
      };
      _.bindALL(obj);
      var expectation = function(callback) {
        this.id = 99;
        return callback();
      };
      expect(expectation(obj.context)).toEqual(20);
    });
  });
});
