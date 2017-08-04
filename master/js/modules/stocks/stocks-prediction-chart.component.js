/**=========================================================
 * Module: stocks,js
 * Angular Stocks table controller
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.stocks')
        .component('stocksPredictionChart', {
          template: '<flot dataset="$ctrl.areaData" options="$ctrl.areaOptions" callback="$ctrl.initialed" height="350px"></flot>',
          bindings: {
            current: '<',
            historical: '<',
            predictions: '<',
            previousClose: '<'
          },
          controller: StocksPredictionChartController
        });

  StocksPredictionChartController.$inject = ['$rootScope'];
    function StocksPredictionChartController($rootScope) {

      var vm = this;

      var plot;

      vm.initialed = function (p) {
        plot = p;
      };

      vm.areaOptions = getAreaOptions();
      vm.areaData = getAreaData();

      vm.$onChanges = function () {
        if (vm.predictions) drawChart();
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
        var current = getCurrentPrice(vm.current);
        var historicalData = getHistoricalData(vm.historical);
        var predictionsData = getPredictionsData(vm.predictions);
        // var previousClose = getPreviousCloseData(vm.previousClose);

        if (predictionsData.length && historicalData.predictions.length) {
          if (predictionsData[0][0] === historicalData.predictions[historicalData.predictions.length-1][0]) {
            predictionsData.splice(0,1);
          }
        }

        if (current[0] && predictionsData.length && historicalData.predictions.length) {
          if (moment(+current[0][0]).date() !== moment().date()) {
            predictionsData.unshift(historicalData.predictions.pop());//utc>
          }
        }

        var predictions = [].concat(historicalData.predictions, predictionsData.slice(0,1));
        var predictionTomorrow = predictionsData.slice(0, 2);
        var predictionExperimental = predictionsData.slice(1);

        var real = [].concat(historicalData.real);

        if (real.length && current.length) {
          if (real[real.length-1][0] === current[0][0]) {
            current[0] = real[real.length-1];
          } else {
            real.push(current[0]);
          }
        }

        if (predictionsData.length) current.push(predictionsData[0]);

        vm.areaData[0].data = predictionTomorrow;
        vm.areaData[1].data = predictions;
        vm.areaData[2].data = real;
        vm.areaData[3].data = current;
        vm.areaData[4].data = predictionExperimental;

        if (plot) {
          plot.getOptions().yaxes[0].min = getMinYaxis();
          plot.setData(vm.areaData);
          plot.setupGrid();
          plot.draw();
        }
      }

      function getPreviousCloseData (previousClose) {
        if(!previousClose) return;
        return [
          // moment(vm.previousClose.date).format('x'),
          moment().set({hour:0,minute:0,second:0,millisecond:0}).format('x'),
          vm.previousClose.price
        ];
      }

      function getNow () {
        var now = moment();
        var nowUTC = moment().utc();
        var minutes = now.get('minutes');
        var hour = nowUTC.get('hour');

        if(now.day() === 0 && now.day() === 6) return now;

        if (hour >= 15 && hour < 21) {
          now.set({hour:4 * (hour - 15), minute:0}).add(4 * minutes, 'minutes');
        } else {
          if (now.date() === nowUTC.date()) {
            if (hour < 15) {
              now.set({hour:0,minute:0,second:0,millisecond:0});
            } else {
              now.set({hour:24,minute:0,second:0,millisecond:0});
            }
          } else {
            if (now.get('hour') < 15) {
              now.set({hour:0,minute:0,second:0,millisecond:0});
            } else {
              now.set({hour:24,minute:0,second:0,millisecond:0});
            }
          }
        }

        return now;
      }

      function getCurrentPrice(current) {
        var now = getNow();

        if (!current) return [];
        return [[
          now.format('x'),
          current
        ]];
      }

      function getPredictionsData (predictions) {
        var predictionsPrices = [];

        if (!predictions) return [];

        var offsetByDay = moment(moment().format('YYYY-MM-DD')).diff(moment().utc().format('YYYY-MM-DD'))/60000; //minutes

        predictions.forEach(function (predictionItem) {
          if (predictionItem.prediction) {

            var date = moment
                .utc(predictionItem.prediction_date).set({hour:21,minute:0,second:0,millisecond:0})
                .add(3, 'h') //move to midnight
                .add(-moment().utcOffset(), 'm')
                .format('x');

            predictionsPrices.push([
              date,
              predictionItem.prediction
            ]);
          }
        });

        return predictionsPrices;
      }

      function getHistoricalData (historical) {
        var real = [];
        var predictions = [];

        if (historical) {

          var offsetByDay = moment(moment().format('YYYY-MM-DD')).diff(moment().utc().format('YYYY-MM-DD'))/60000; //minutes

          historical.dates.forEach(function (date, index) {

            var dateX = moment.utc(date)
                .set({hour:21,minute:0,second:0,millisecond:0})
                .add(3, 'h') //move to midnight
                .add(-moment().utcOffset(), 'm')
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
            "label": "Prediction for tomorrow",
            "color": "#63abdf",
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
          },
          {
            "label": "Real-time price",
            "color": "#ffb093",
            dashes: { show: true, dashLength: 2 },
            points: {
              show: true,
              radius: 3
            },
            "data": []
          },
          {
            "label": "Prediction (experimental)",
            "color": "#add2df",
            dashes: { show: true },
            points: {
              show: true,
              radius: 3
            },
            "data": []
          }
        ];
      }

      function getAreaOptions () {
        var today = moment().set({hour:0,minute:0,second:0,millisecond:0}).format('x');
        var yesterday = moment().set({hour:24,minute:0,second:0,millisecond:0}).format('x');

        var now = getNow();

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
            markings: [
              {
                xaxis: {
                  from: today,
                  to: yesterday
                },
                color: "#f6f6f6"
              },
              {
                xaxis: {
                  from: now.format('x'),
                  to: now.format('x')
                },
                color: "#ddd"
              }
            ]
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
