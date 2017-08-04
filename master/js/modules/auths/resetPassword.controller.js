/**=========================================================
 * Module: resetPassword.controller.js
 * Demo for resetPassword api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.auths')
        .controller('ResetPasswordController', ResetPasswordController);

    ResetPasswordController.$inject = ['$stateParams', '$state', '$timeout', 'authService'];

    function ResetPasswordController($stateParams, $state, $timeout, authService) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            // bind here all data from the form
            vm.account = {};
            // place the message if something goes wrong
            vm.authMsg = '';
            vm.status = false;
            vm.loading = false;

            vm.disabledEmail = false;
            vm.disabledKey = false;

            if ($stateParams.email) {
              vm.account.email = $stateParams.email;
              vm.disabledEmail = true;
            }

            if ($stateParams.key) {
              vm.account.key = $stateParams.key;
              vm.disabledKey = true;
            }

            vm.resetPassword = function() {
                vm.authMsg = '';

                if (vm.resetPasswordForm.$valid) {
                    vm.loading = true;
                    authService.resetPassword(vm.account.email, vm.account.password, vm.account.key).then(
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
                          } else {
                            vm.authMsg = 'Server Request Error';
                          }
                        }
                    );
                } else {
                    // set as dirty if the user click directly to login so we show the validation messages
                    /*jshint -W106*/
                    vm.resetPasswordForm.account_email.$dirty = true;
                    vm.resetPasswordForm.account_password.$dirty = true;
                    vm.resetPasswordForm.account_password_confirm.$dirty = true;
                    vm.resetPasswordForm.account_key.$dirty = true;
                }
            };
        }
    }
})();
