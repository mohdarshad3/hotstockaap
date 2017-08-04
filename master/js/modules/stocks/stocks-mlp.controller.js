/**=========================================================
 * Module: stocks,js
 * Angular Stocks mlp controller
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.stocks')
        .controller('StocksMlpController', StocksMlpController);

  StocksMlpController.$inject = ['stocksService'];
    function StocksMlpController(stocksService) {
      var vm = this;

      vm.tickers = [];
      vm.date = new Date('2017-03-16'); //todo set subtract day
      vm.minDate = new Date('2017-03-16');
      vm.maxDate = moment().businessSubtract(2)._d;

      vm.onlyWeekendsPredicate = function(date) {
        var day = date.getDay();
        return day !== 0 && day !== 6;
      };

      vm.loadData = function () {
        var ticker = vm.ticker.tickerSymbol;
        var date = moment(vm.date).format('YYYY-MM-DD');

        stocksService.getHistoricalPredictions(ticker, date)
            .then(function (historical) {
              vm.historical = historical[ticker];
            });
      };

      stocksService.getCompanies()
          .then(function (tickers) {
            vm.tickers = tickers
                .filter(function(ticker) { //todo remove Microsoft
                  return ticker.tickerSymbol !== "MSFT";
                });

            vm.ticker = vm.tickers[0];
            vm.loadData();
            return vm.tickers;
          });

    }
})();
