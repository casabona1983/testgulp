$ = jQuery = require("jquery");
var myChart = require('./my_modules/myChart');
var Chart= require("chart.js");
$(function () {
    if (myChart.init()) myChart.loadChart();
});
