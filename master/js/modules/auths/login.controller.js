/**=========================================================
 * Module: login.controller.js
 * Demo for login api
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.auths')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['$rootScope', '$scope', '$http', '$state', 'authService', '$mdDialog'];

    function LoginFormController($rootScope, $scope, $http, $state, authService, $mdDialog) {
        var vm = this;
        activate();
        function activate() {
            vm.account = {};
            vm.authMsg = '';
            vm.loading = false;
            vm.login = function(ev) {
                vm.authMsg = '';
                if (vm.loginForm.$valid) {
                    vm.loading = true;
                    authService.login(vm.account.email, vm.account.password).then(
                        function(user) {
                            vm.loading = false;
                            $state.go('app.home');
                        },
                        function(errors) {
                            vm.loading = false;
                            vm.authMsg=errors;
                        }
                    );
                } else {
                    vm.loginForm.account_email.$dirty = true;
                    vm.loginForm.account_password.$dirty = true;
                }
            };
        }
    }
})();