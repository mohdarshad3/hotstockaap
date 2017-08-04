/**=========================================================
 * Module: stocks,js
 * Angular Stocks table controller
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.wtst')
        .component('wtstAbout', {
          templateUrl: 'app/views/wtst/about.html',
          controller: WtstAboutController
        });

  WtstAboutController.$inject = [];
    function WtstAboutController() {
      var vm = this;
    }
})();
