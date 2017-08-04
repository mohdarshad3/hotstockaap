/**=========================================================
 * Module: stocks,js
 * Angular Stocks table controller
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.wtst')
        .component('wtstPartners', {
          templateUrl: 'app/views/wtst/partners.html',
          controller: WtstPartnersController
        });

  WtstPartnersController.$inject = [];
    function WtstPartnersController() {
      var vm = this;
    }
})();
