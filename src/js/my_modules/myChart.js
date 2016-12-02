var myChart = function () {

	var ctx;
	var piechart;
	var dataset = ["backgrounds", "data", "literal"];
	dataset["backgrounds"] = [];
	dataset["data"] = [];
	dataset["literal"] = [];

	var datachart = {};



	var init = function () {
		var backgrounds = {};
		var literal = {};
		var data = {};
		$("#chart-info li").each(function (indexInArray) {
			$(this).find(".media-left>span").css("background-color", $(this).attr("data-background"));
			dataset["backgrounds"][indexInArray] = $(this).attr("data-background");
			dataset["data"][indexInArray] = $(this).attr("data-data");
			dataset["literal"][indexInArray] = $(this).attr("data-literal");
			$(this).removeAttr("data-background").removeAttr("data-data").removeAttr("data-literal");
		});
		_buildChartData();
		return true;
	};

	var _buildChartData = function () {
		console.log(dataset);
		var temporalObject = {};
		temporalObject["data"] = dataset["data"];
		temporalObject["backgroundColor"] = dataset["backgrounds"];
		datachart["datasets"] = [];
		datachart["labels"] = dataset["literal"];
		datachart["datasets"].push(temporalObject);
		console.log(datachart);
	};

	var loadChart = function () {
		var config = {
			type: "pie",
			options: {
				/*events: false,*/
				animation: {
					duration: 0
				},
				legend: {
					display: false,
				},
				tooltips: {
					backgroundColor: "white",
					bodyFontColor: "black",
					fontColor: "black",
					fontFamily: "Verdana, Geneva, sans-serif",
					fontSize: 9
				},
				/*onAnimationComplete: function () {
					var self = this;

					var elementsArray = [];
					Chart.helpers.each(self.data.datasets, function (dataset, datasetIndex) {
						Chart.helpers.each(dataset.metaData, function (element, index) {
							var tooltip = new Chart.Tooltip({
								_chart: self.chart,
								_data: self.data,
								_options: self.options,
								_active: [element]
							}, self);

							tooltip.update();
							tooltip.transition(Chart.helpers.easingEffects.linear).draw();
						}, self);
					}, self);
				}*/
			},
			data: datachart,
		};

		ctx = document.getElementById("chart").getContext("2d");
		piechart = new Chart(ctx, config);
	};

	return {
		init: init,
		loadChart: loadChart
	};

}();

module.exports = myChart;