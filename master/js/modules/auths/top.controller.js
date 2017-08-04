/**=========================================================
 * Module: top.controller.js
 * Demo for TopController api
 =========================================================*/
(function() {
    'use strict';
    angular
        .module('app.auths')
        .controller('TopFormController', TopFormController);

    TopFormController.$inject = ['$rootScope', '$scope', '$http', '$state', 'authService'];

    function TopFormController($rootScope, $scope, $http, $state, authService) {
        var vm = this;
        activate();
        function activate() {
            vm.logout = function(ev) {
                authService.logout().then(
                    function(user) {
                        vm.loading = false;
                        $state.go('auth.login');
                    },
                    function(errors) {}
                );
            };
        }
    }
})();