HighTables.Base = function(element) {
  element = $(element);

  var options;
  var labelColumn;
  var valueColumns;

  var CHART_OPTIONS_MAP = {
    "options": function(value) { return safeEval(value); },
    "title": function(value) { return { title: { text: value } }; },
    "order": function(value) { return { order: value }; },
    "x-interval": function(value) { return { xAxis: { tickInterval: parseInt(value) } }; },
    "x-min": function(value) { return { xAxis: { min: parseInt(value) } }; },
    "y-interval": function(value) { return { yAxis: { tickInterval: parseInt(value) } }; },
    "y-min": function(value) { return { yAxis: { min: parseInt(value) } }; }
  };

  function safeEval(name) {
    var parts = name.split(".");
    var result = window;
    while (parts.length > 0) {
      result = result[parts.shift()];
    }
    return (typeof result === "function") ? result() : result;
  }

  function getChartOptions() {
    var options = {};

    var dataAttr;
    for (var key in CHART_OPTIONS_MAP) {
      dataAttr = element.attr("data-" + key);
      if (dataAttr) {
        $.extend(options, CHART_OPTIONS_MAP[key](dataAttr));
      }
    }

    return $.extend(options, {
      labelColumn: getLabelColumn(),
      valueColumns: getValueColumns()
    });
  };

  function getLabelColumn() {
    return parseInt(element.attr("data-label-column"));
  }

  function getValueColumns() {
    var attr = element.attr("data-value-columns");

    if (attr) {
      return HighTables.Parse.integers(attr.split(","));
    } else {
      return null;
    }
  }

  this.options = function() {
    if (!options) {
      options = getChartOptions();
      options.labelColumn = this.labelColumn();
      options.valueColumns = this.valueColumns();
    }

    return options;
  };

  this.labelColumn = function() {
    if (typeof labelColumn === "undefined") {
      labelColumn = getLabelColumn();
    }

    return labelColumn;
  };

  this.valueColumns = function() {
    if (typeof valueColumns === "undefined") {
      valueColumns = getValueColumns();
    }

    return valueColumns;
  };

  this.element = element;
};
