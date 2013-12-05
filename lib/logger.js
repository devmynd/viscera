(function() {
  var Line = Backbone.Model.extend({
    initialize: function() {
      this.set("timestamp", new Date);
    },

    displayType: function() {
      return "[" + this.get("type").toUpperCase() + "]";
    },

    toString: function() {
      return this.displayType() + " " + this.get("message") + " - " + this.timestampFormatted();
    },

    padded: function(string, direction) {
      direction = direction || "right";
      var Lpad = "";
      var Rpad = "";
      direction === "right" ? Rpad = " " : Lpad = " ";
      var length = string.length;
      var difference = 100 - length;
      if (length <= 100) {
        _.range(difference).each(function() { string = Lpad + string + Rpad; });
      }
      return string;
    },

    timestampFormatted: function() {
      var d = this.get("timestamp");
      var h = d.getHours();
      var hours = h > 12 ? h - 12 : h;
      return hours + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
    },

    toConsole: function() {
      var type = this.get("type");
      type = ["info", "log", "warn", "error"].contains(type) ? type : "info";
      return console[type](this.toString());
    }
  });

  Viscera.Logger = (function() {
    var Logger = Backbone.Collection.extend({
      Line: Line,
      model: Line,
      enabled: true,
      silent: false,

      initialize: function() {
        this.lines = this;
      },

      log: function(message, type, data) {
        type = type || "info";
        this.logMessage(message, type, data);
      },

      info: function(message, data) {
        this.logMessage(message, "info", data);
      },

      warn: function(message, data) {
        this.logMessage(message, "warn", data);
      },

      error: function(message, data) {
        this.logMessage(message, "error", data);
      },

      logMessage: function(message, type, data) {
        if (this.enabled) {
          this.add({
            message: message,
            type: type,
            data: data
          });
          !this.silent && this.last().toConsole();
        }
      },

      clear: function() {
        this.reset([]);
      },

      toString: function() {
        return this.map(function(line) { return line.toString(); }).join("\n");
      },

      toConsole: function() {
        this.each(function(line) { line.toConsole(); });
      },

      toTable: function() {
        return _.template([
          '<table cellpadding="0" cellspacing="0" border="0" id="backbone-logger">',
          '<thead>',
          '<tr>',
          '<th>Type</th>',
          '<th>Message</th>',
          '</tr>',
          '</thead>',
          '<tbody>',
          '<% lines.each(function(line) { %>',
          '<tr class="<%= line.get("type") %>">',
          '<td><%= line.displayType() %></td>',
          '<td><%= line.get("message") %></td>',
          '</tr>',
          '<% }) %>',
          '</tbody>',
          '</table>'
        ].join(""), { lines: this });
      }
    });
    return new Logger;
  })();

  window.bblog = Viscera.Logger;
})();
