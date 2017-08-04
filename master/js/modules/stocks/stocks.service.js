(function() {
  'use strict';

  angular
      .module('app.stocks')
      .factory('stocksService', stocksService);

  stocksService.$inject = ['$rootScope', '$resource'];

  function stocksService($rootScope, $resource) {

    var VOCABULARY_URL = $rootScope.app.companiesUrl;
    var companies = $resource(VOCABULARY_URL + '/:ticker', {ticker: '@ticker'}, {
      'bySymbol': {
        method: 'GET',
        isArray: true,
        cache: true
      },
      'all': {
        method: 'GET',
        isArray: true,
        cache: true
      }
    });

    var PREDICTIONS_URL = $rootScope.app.predictionsUrl;
    var predictions = $resource(PREDICTIONS_URL + '/:tickers/:start_date/:end_date', {
      tickers: '@tickers',
      start_date: '@start_date',
      end_date: '@end_date'
    }, {
      query: {
        method: 'GET'
      }
    });

    var HISTORICAL_PREDICTIONS_URL = $rootScope.app.historicalPredictionsUrl;
    var historicalPredictions = $resource(HISTORICAL_PREDICTIONS_URL + '/:ticker/:date', {
      ticker: '@ticker',
      date: '@date'
    }, {
      query: {
        method: 'GET'
      }
    });


    var HISTORICAL_STOCKS_URL = $rootScope.app.historicalStocksUrl;
    var historicalStocks = $resource(HISTORICAL_STOCKS_URL + '/:ticker/:date', {
      ticker: '@ticker',
      date: '@date'
    }, {
      query: {
        method: 'GET'
      }
    });

    function getCompanyBySymbol (ticker) {
      return companies.bySymbol({ticker:ticker}).$promise;
    }

    function getCompanies() {
      return companies.all().$promise;
    }

    function getPredictions(tickers, start_date, end_date) {
      if (Array.isArray(tickers)) { tickers = tickers.join(','); }
      return predictions.query({tickers: tickers, start_date: start_date, end_date: end_date}).$promise;
    }

    function getPredictionsByDays(tickers, days) {
      var now = moment().utc();
      var start_date = moment().utc();
      var end_date = moment().utc().businessAdd(days);

      if(now.day() === 0 || now.day() === 6) {
        start_date = start_date.businessAdd(1);
        end_date = end_date.businessAdd(1);
      }

      return getPredictions(tickers, start_date.format('YYYY-MM-DD'), end_date.format('YYYY-MM-DD'));
    }

    function getHistoricalPredictions(tickers, date) {
      if (Array.isArray(tickers)) { tickers = tickers.join(','); }
      return historicalPredictions.query({ticker: tickers, date: date}).$promise;
    }

    function getHistoricalStocks(ticker, date) {
      return historicalStocks.query({ticker: ticker, date: date}).$promise;
    }

    return {
      getCompanyBySymbol: getCompanyBySymbol,
      getCompanies: getCompanies,
      getPredictions: getPredictions,
      getPredictionsByDays: getPredictionsByDays,
      getHistoricalPredictions: getHistoricalPredictions,
      getHistoricalStocks: getHistoricalStocks
    };
  }
})();
