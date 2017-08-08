/**=========================================================
 * Module: confirmAccount.controller.js
 * Demo for confirmAccountController api
 =========================================================*/
(function() {
    'use strict';
    angular
        .module('app.auths')
        .controller('ConfirmController', ConfirmController);

    ConfirmController.$inject = ['$rootScope', '$scope','$sce', '$http', '$state', 'authService'];

    function ConfirmController($rootScope, $scope,$sce,$http, $state, authService) {


    }
})();