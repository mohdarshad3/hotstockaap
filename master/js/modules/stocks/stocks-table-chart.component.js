/**=========================================================
 * Module: stocks,js
 * Angular Stocks table controller
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.stocks')
        .component('stocksTableChart', {
          template: '<flot dataset="$ctrl.areaData" options="$ctrl.areaOptions" callback="$ctrl.initialed" height="100px" width="200px"></flot>',
          bindings: {
            historical: '<',
            predictions: '<'
          },
          controller: StocksTableChartController
        });

  StocksTableChartController.$inject = ['$rootScope'];
    function StocksTableChartController($rootScope) {

      var vm = this;

      var plot;

      vm.initialed = function (p) {
        plot = p;
      };

      vm.$onChanges = function () {
        if (vm.predictions && vm.historical) drawChart();
      };

      function getMinYaxis (data) {
        var min = Infinity;
        var max = 0;

        data.forEach(function (item) {
          item.data.forEach(function (point) {
            var price = point[1];
            if (min > price) min = price;
            if (max < price) max = price;
          });
        });

        if (min === Infinity) return 0;

        min = 2*min - max;
        if (min > 0) return Math.floor(min);

        return 0;
      }

      function drawChart() {
        var historicalData = getHistoricalData(vm.historical);
        var predictionsData = getPredictionsData(vm.predictions);

        try {
          if (historicalData.prices[4][0] === predictionsData[0][0]) {
            predictionsData.splice(0,1);
          }
        } catch (e) {}

        var data = getAreaData();
        data[0].data = historicalData.predictions; //Historical prediction
        data[1].data = historicalData.prices; //Historical prices
        data[2].data = predictionsData.slice(0, 5); //Prediction (experimental)

        data[0].data.push(predictionsData[0]);
        data[1].data.push(predictionsData[0]);

        var options = getAreaOptions();
        options.yaxis.min = getMinYaxis(data);

        vm.areaOptions = options;
        vm.areaData = data;
      }

      function getPredictionsData (predictions) {
        var predictionsPrices = [];

        if (!predictions) return [];

        predictions.forEach(function (predictionItem) {
          if (predictionItem.prediction) {
            predictionsPrices.push([
              moment(predictionItem.prediction_date).format('x'), //todo
              predictionItem.prediction
            ]);
          }
        });

        return predictionsPrices;
      }

      function getHistoricalData (historical) {
        var prices = [];
        var predictions = [];

        if (historical) {

          historical.dates.forEach(function (date, index) {

            var dateX = moment(date + 'T00:00:00.000Z').format('x');

            if (historical.closePrices[index]) {
              prices.push([
                dateX,
                historical.closePrices[index]
              ]);
            }

            if (historical.predictions[index]) {
              predictions.push([
                dateX,
                historical.predictions[index]
              ]);
            }
          });
        }

        return {
          prices: prices,
          predictions: predictions
        };
      }

      function getAreaData (predictions) {
        return [
          {
            "label": "Historical prediction",
            "color": "#4f71df",
            points: { show: false, radius: 2 },
            lines: { show: true },
            "data": []
          },
          {
            "label": "Historical prices",
            "color": "#ff786d",
            points: { show: false, radius: 2 },
            lines: { show: true },
            "data": []
          },
          {
            "label": "Prediction (experimental)",
            "color": "#4f71df",
            points: { show: false, radius: 2 },
            dashes: { show: true, dashLength: 5 },
            "data": []
          }
        ];
      }

      function getAreaOptions () {
        return {
          legend: {
            show: false,
          },
          grid: {
            borderColor: '#eee',
            borderWidth: 1,
            hoverable: true,
            backgroundColor: '#fcfcfc'
          },
          tooltip: true,
          tooltipOpts: {
            content: function (label, x, y) { return y.toFixed(2); }
          },
          xaxis: {
            tickColor: '#fcfcfc',
            mode: 'time',
            timezone: "browser",
            tickSize: [1, 'day'],
            timeformat: "%d",
            font:{
              size: 9
            }
          },
          yaxis: {
            min: 0,
            minTickSize: 1,
            tickColor: '#eee',
            position: ($rootScope.app.layout.isRTL ? 'right' : 'left'),
            tickFormatter: function (v) {
              return v;
            },
            font:{
              size: 9
            }
          },
          shadowSize: 0
        };
      }
    }
})();
