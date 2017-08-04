/**=========================================================
 * Module: stocks,js
 * Angular Stocks table controller
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.wtst')
        .component('wtstJoin', {
          templateUrl: 'app/views/wtst/join.html',
          controller: WtstJoinController
        });

  WtstJoinController.$inject = [];
    function WtstJoinController() {
      var vm = this;
    }
})();
