window.HighTables = {};

HighTables.charts = {};

$(document).ready(function() {
  Highcharts.setOptions({
    credits: {
      enabled: false
    }
  });

  $(".line-chart").each(function() {
    HighTables.LineChart.renderTo(this);
  });

  $("table.render-to-line-chart").each(function() {
    HighTables.LineChart.renderFromTable(this);
  });

  $("table.render-to-area-chart").each(function() {
    HighTables.LineChart.renderFromTable(this, {
      chart: { type: "area" }
    });
  });

  $("table.render-to-stack-chart").each(function() {
    HighTables.LineChart.renderFromTable(this, {
      chart: { type: "area" },
      plotOptions: { area: { stacking: "normal" } }
    });
  });

  $("table.render-to-bar-chart").each(function() {
    HighTables.BarChart.renderFromTable(this);
  });

  $("table.render-to-column-chart").each(function() {
    HighTables.BarChart.renderFromTable(this, {
      chart: { type: "column" }
    });
  });

  $("table.render-to-pie-chart").each(function() {
    HighTables.PieChart.renderFromTable(this);
  });

  if (HighTables.includeHighchartsLinks) {
    Highcharts.setOptions({
      credits: { enabled: true }
    });
  }
});