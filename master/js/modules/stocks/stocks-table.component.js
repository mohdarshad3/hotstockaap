/**=========================================================
 * Module: stocks,js
 * Angular Stocks table controller
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.stocks')
        .component('stocksTable', {
          templateUrl: 'app/views/stocks.table.html',
          controller: StocksTableController,
          controllerAs: 'stocks'
        });

  StocksTableController.$inject = ['$rootScope', '$scope', '$timeout', 'stocksService'];
    function StocksTableController($rootScope, $scope, $timeout, stocksService) {
      var vm = this;

      vm.tickers = [];
      vm.realTime = false;
      vm.forecastDay = -1;

      vm.getForecast = getForecast;

      var serverConnection;

      this.$onDestroy = function () {
        if (serverConnection) serverConnection.disconnect();
      };

      var tickers = stocksService.getCompanies()
        .then(function (tickers) {
          vm.tickers = tickers
              .filter(function(ticker) { //todo remove Microsoft
                return ticker.tickerSymbol !== "MSFT";
              })
              .map(function(ticker) {
                ticker.ask = 0;
                ticker.bid = 0;
                ticker.last = 0;
                ticker.date = moment().format();
                return ticker;
              });
          connectRealTime();
          return vm.tickers;
        })
        .then(function (tickers) {
          var symbols = tickers.map(function (item) { return item.tickerSymbol;});

          //load predictions
          stocksService.getPredictionsByDays(symbols, 9)
              .then(function (predictions) {
                tickers.forEach(function (item) {
                  item.predictions = predictions[item.tickerSymbol];
                });
              });

          //load historical prices
          var date = moment().utc().businessSubtract(5).format('YYYY-MM-DD');
          stocksService.getHistoricalPredictions(symbols, date)
              .then(function (historical) {
                tickers.forEach(function (item) {
                  item.historical = historical[item.tickerSymbol];
                });
              });


          return tickers;
        });

      function getForecast(item, day) {
        if (item.predictions && item.predictions[day-1]) {
          var forecast = item.predictions[day-1];
          var change = forecast.prediction - item.last;
          var changePercent = item.last === 0 ? 0 : (100 * change /item.last);
          return {
            trend: item.last === 0 ? '' : (change > 0 ? 'text-success' : 'text-danger'),
            prediction: forecast.prediction,
            change: change,
            changePercent: changePercent,
            changeFormatted: (change > 0 ? '+' :'') + change.toFixed(2) + ' (' + (changePercent > 0 ? '+' :'') + changePercent.toFixed(2) + '%)',
            prediction_date: forecast.prediction_date
          };
        }
      }

      function connectRealTime() {
        var STOCKS_REAL_TIME_URL = $rootScope.app.rtUrl;

        serverConnection = io(STOCKS_REAL_TIME_URL);

        serverConnection.on('quote', updateTicker);

        serverConnection.on('connect', function() {
          tickers.then(function () {
            var tickers = vm.tickers.map(function(ticker) {return ticker.tickerSymbol;});
            serverConnection.emit('subscribe', tickers);
          });
        });

        function updateTicker (data) {
          var index = vm.tickers.findIndex(function (t) { return data.ticker === t.tickerSymbol; });

          if (index >= 0) {
             var date = new Date(Math.floor(data.timestamp * 1000)).toISOString();

            var time = moment(vm.tickers[index].date).format('h:mm:ss');
            var quoteDate = moment(vm.tickers[index].date).format('YYYY-MM-DD');
            var price = parseFloat(data.price).toFixed(2);

            var tickerElement = $('.ticker.'+ data.ticker);
            var priceElement = tickerElement.find('.ticker_' + data.type);
            var dateElement = tickerElement.find('.ticker_date');
            var timeElement = tickerElement.find('.ticker_time');

            var priceStyle = '';
            if (vm.tickers[index][data.type] < data.price) priceStyle = 'text-success';
            if (vm.tickers[index][data.type] > data.price) priceStyle = 'text-danger';

            vm.tickers[index][data.type] = data.price;
            vm.tickers[index].date = date;

            if (data.type === 'last') {
              $scope.$digest();
            }

            priceElement.text('$' + price);
            dateElement.text(quoteDate);
            timeElement.text(time);

            if (priceStyle && priceElement.length) {
              if (priceElement.get(0).timer) clearTimeout(priceElement.get(0).timer);
              priceElement.removeClass('text-success text-danger').addClass(priceStyle);
              priceElement.get(0).timer = setTimeout(function(){
                priceElement.removeClass('text-success text-danger');
              }, 2000);
            }
          }
        }

      }

    }
})();
