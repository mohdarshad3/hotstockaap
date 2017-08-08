/**=========================================================
 * Module: login.controller.js
 * Demo for login api
 =========================================================*/


(function () {
    'use strict';

    angular
        .module('app.auths')
        .controller('LoginFormController', LoginFormController);


    LoginFormController.$inject = ['$rootScope', '$scope', '$http', '$state', 'authService', '$mdDialog'];

    function LoginFormController($rootScope, $scope, $http, $state, authService, $mdDialog) {
        var vm = this;

        activate();


        ////////////////

        function activate() {
            // bind here all data from the form
            vm.account = {};
            // place the message if something goes wrong
            vm.authMsg = '';
            vm.loading = false;

            vm.login = function (ev) {
                vm.authMsg = '';

                if (vm.loginForm.$valid) {

                    vm.loading = true;
                    debugger;
                    authService.login(vm.account.email, vm.account.password).then(
                        function (user) {
                            debugger;
                            vm.loading = false;
                            if ($rootScope.lastState) {
                                $state.go($rootScope.lastState.name, $rootScope.lastState.params);
                            } else {
                                $state.go('app.home');
                            }
                        },
                        function (errors) {
                            vm.loading = false;
                            if (errors.data && errors.data.message) {
                                vm.authMsg = errors.data.message;
                            } else {
                                vm.authMsg = 'Server Request Error';
                            }
                        }
                    );
                    
                } else {
                    // set as dirty if the user click directly to login so we show the validation messages
                    /*jshint -W106*/
                    vm.loginForm.account_email.$dirty = true;
                    vm.loginForm.account_password.$dirty = true;
                }
            };
        }
    }
})();