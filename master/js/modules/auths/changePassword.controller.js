/**=========================================================
 * Module: changePassword.controller.js
 * Demo for changePassword api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.auths')
        .controller('ChangePasswordController', ChangePasswordController);

    ChangePasswordController.$inject = ['$rootScope', '$http', '$state', '$timeout', 'authService'];

    function ChangePasswordController($rootScope, $http, $state, $timeout, authService) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // bind here all data from the form
            vm.account = {};
            // place the message if something goes wrong
            vm.authMsg = '';
            vm.status = false;
            vm.correctPassword = false;
            vm.loading = false;

            vm.changePassword = function() {
                vm.authMsg = '';

                if (vm.changePasswordForm.$valid) {
                    vm.loading = true;
                    authService.changePassword(vm.account.currentPassword, vm.account.newPassword).then(
                        function(password) {
                          vm.loading = false;
                          vm.status = true;
                          vm.authMsg = 'Successfully. Go to Login page';
                          $timeout(function () {
                            $state.go('auth.login');
                          }, 1000);
                        },
                        function(errors) {
                          vm.loading = false;
                          if (errors.data && errors.data.message) {
                            vm.authMsg = errors.data.message;
                            vm.account.currentPassword = '';
                            // vm.correctPassword = true;
                          } else {
                            vm.authMsg = 'Server Request Error';
                          }
                        }
                    );
                } else {
                    // set as dirty if the user click directly to login so we show the validation messages
                    /*jshint -W106*/
                    vm.changePasswordForm.account_current_password.$dirty = true;
                    vm.changePasswordForm.account_new_password.$dirty = true;
                    vm.changePasswordForm.account_new_password_confirm.$dirty = true;
                }
            };
        }
    }
})();
