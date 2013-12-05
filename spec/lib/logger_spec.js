describe("Viscera.Logger", function() {
  var subject;
  var data;
  beforeEach(function() {
    subject = Viscera.Logger;
    subject.enabled = true;
    data = { test: "data" };
  });

  afterEach(function() {
    subject.enabled = false;
    subject.silent = true;
  });

  it("is a backbone collection", function() {
    expect(subject).toBeInstanceof(Backbone.Collection);
  });

  it("has a logline model", function() {
    expect(subject.Line).toEqual(subject.model);
  });

  afterEach(function() {
    subject.clear();
  });

  describe("log", function() {
    it("adds an info line to the log", function() {
      subject.log("message");
      expect(subject.first().get("type")).toEqual("info");
    });

    it("adds data to the line", function() {
      subject.log("message", "info", data);
      expect(subject.first().get("data")).toEqual({ test: "data" });
    });
  });

  describe("info", function() {
    it("adds an info line to the log", function() {
      subject.info("message", data);
      expect(subject.first().get("type")).toEqual("info");
      expect(subject.first().get("data")).toEqual({ test: "data" });
    });
  });

  describe("warn", function() {
    it("adds a warning line to the log", function() {
      subject.warn("message", data);
      expect(subject.first().get("type")).toEqual("warn");
      expect(subject.first().get("data")).toEqual({ test: "data" });
    });
  });

  describe("error", function() {
    it("adds a error line to the log", function() {
      subject.error("message", data);
      expect(subject.first().get("type")).toEqual("error");
      expect(subject.first().get("data")).toEqual({ test: "data" });
    });
  });

  describe("clear", function() {
    it("clears the log", function() {
      subject.log("message");
      subject.clear();
      expect(subject.length).toEqual(0);
    });
  });

  describe("toString", function() {
    it("renders the lines as a string", function() {
      subject.log("line 1");
      subject.log("line 2");
      expect(subject.toString()).toMatch(/\[INFO\] line 1/);
      expect(subject.toString()).toMatch(/\[INFO] line 2/);
    });
  });

  describe("toConsole", function() {
    it("renders the lines console", function() {
      subject.log("line 1");
      subject.log("line 2");
      spyOn(console, "info");
      subject.toConsole();
      expect(console.info.callCount).toEqual(2);
    });
  });
});
