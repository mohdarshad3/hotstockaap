/**=========================================================
 * Module: stocks,js
 * Angular Stocks table controller
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.stocks')
        .component('stocksMlpChart', {
          template: '<flot dataset="$ctrl.areaData" options="$ctrl.areaOptions" callback="$ctrl.initialed" height="350px"></flot>',
          bindings: {
            historical: '<'
          },
          controller: StocksMlpChartController
        });

  StocksMlpChartController.$inject = ['$rootScope'];
    function StocksMlpChartController($rootScope) {

      var vm = this;

      var plot;

      vm.initialed = function (p) {
        plot = p;
      };

      vm.areaOptions = getAreaOptions();
      vm.areaData = getAreaData();

      vm.$onChanges = function () {
        if (vm.historical) drawChart();
      };

      function getMinYaxis () {
        var min = Infinity;
        var max = 0;

        vm.areaData.forEach(function (item) {
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

        vm.areaData[0].data = historicalData.predictions;
        vm.areaData[1].data = historicalData.real;

        if (plot) {
          plot.getOptions().yaxes[0].min = getMinYaxis();
          plot.setData(vm.areaData);
          plot.setupGrid();
          plot.draw();
        }
      }

      function getHistoricalData (historical) {
        var real = [];
        var predictions = [];

        if (historical) {

          var offsetByDay = moment(moment().format('YYYY-MM-DD')).diff(moment().utc().format('YYYY-MM-DD'))/60000; //minutes

          historical.dates.forEach(function (date, index) {

            var dateX = moment(date + 'T00:00:00.000Z')
                .add(offsetByDay - moment().utcOffset(), 'm')
                .add(1, 'd')
                .format('x');

            if (historical.closePrices[index]) {
              real.push([
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
          real: real,
          predictions: predictions
        };
      }

      function getAreaData () {
        return [
          {
            "label": "Historical prediction",
            "color": "#4f71df",
            points: {
              show: true,
              radius: 3
            },
            lines: {
              show: true
            },
            "data": []
          },
          {
            "label": "Historical prices",
            "color": "#ff786d",
            points: {
              show: true,
              radius: 3
            },
            lines: {
              show: true
            },
            "data": []
          }
        ];
      }

      function getAreaOptions () {

        return {
          legend: {
            show: true,
            position: "se",
            backgroundOpacity: 0.5
          },
          grid: {
            borderColor: '#eee',
            borderWidth: 1,
            hoverable: true,
            backgroundColor: '#fcfcfc',
            markings: []
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
            timeformat: "%b %d"
          },
          yaxis: {
            min: 0,
            minTickSize: 1,
            tickColor: '#eee',
            position: ($rootScope.app.layout.isRTL ? 'right' : 'left'),
            tickFormatter: function (v) {
              return v;
            }
          },
          shadowSize: 0
        };
      }
    }
})();
