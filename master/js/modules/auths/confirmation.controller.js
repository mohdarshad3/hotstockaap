/**=========================================================
 * Module: forgotPassword.controller.js
 * Demo for forgotPassword api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.auths')
        .controller('ConfirmationController', ConfirmationController);

    ConfirmationController.$inject = ['$http', '$state', 'authService'];

    function ConfirmationController($http, $state, authService) {
        var vm = this;
        alert("hi");
        activate();

        ////////////////

        function activate() {
            vm.status = false;
            vm.loading = false;

            vm.confirm = function() {
              vm.loading = true;

              //make request to the server
              //vm.loading = false;
              //show confirmed message
              vm.status = true;
            };
        }
    }
})();
