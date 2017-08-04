/**=========================================================
 * Module: register.controller.js
 * Demo for register account api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.auths')
        .controller('RegisterFormController', RegisterFormController);

    function DisclaimerController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
    }
    function confirmAcount($scope, $mdDialog) {
    
        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
    }

    RegisterFormController.$inject = ['$mdDialog', '$state', 'authService'];

    function RegisterFormController($mdDialog, $state, authService) {
        var vm = this;
        
        function acceptDisclaimer(ev) {
            return $mdDialog.show({
              controller: DisclaimerController,
              templateUrl: 'app/pages/disclaimer.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: false
            });
        };
        

        //activate();

        ////////////////

        function activate() {
            // bind here all data from the form
            vm.account = {};
            // place the message if something goes wrong
            vm.authMsg = '';
            vm.loading = false;

            vm.register = function(ev) {
                vm.authMsg = '';

                if (vm.registerForm.$valid) {

                    // show disclaimer
                    acceptDisclaimer(ev)
                        .then(function(answer) {
                            
                            vm.loading = true;
                            authService.register(
                                vm.account.name,
                                vm.account.username,
                                vm.account.email,
                                vm.account.password
                            )
                            .then(function() {
                                vm.loading = false;
                                $state.go('app.home');
                            }, function(errors) {
                                vm.loading = false;
                                if (errors.data && errors.data.message) {
                                    vm.authMsg = errors.data.message;
                                } else {
                                    vm.authMsg = 'Server Request Error';
                                }
                            });

                        });

                  
                } else {
                    // set as dirty if the user click directly to login so we show the validation messages
                    /*jshint -W106*/
                    vm.registerForm.account_name.$dirty = true;
                    vm.registerForm.account_username.$dirty = true;
                    vm.registerForm.account_email.$dirty = true;
                    vm.registerForm.account_password.$dirty = true;
                    vm.registerForm.account_agreed.$dirty = true;
                }
            };

            vm.showAdvanced = function (e) {
              $mdDialog.show({
                contentElement: '#terms',
                parent: angular.element(document.body),
                targetEvent: e,
                clickOutsideToClose: true
              });
            };
            vm.confirmAccount=function(){
                debugger;
                authService.login('dsmail.alok@gmail.com', '12345').then(
                    function(user) {
                         debugger;
                        vm.loading = false;
                        $state.go('auth.confirmAcount');
                    },
                    function(errors) {
                         debugger;
                      vm.loading = false;
                      if (errors.data && errors.data.message) {
                        vm.authMsg = errors.data.message;
                      } else {
                        vm.authMsg = 'Server Request Error';
                      }
                    }
                );
            }
        }
    }
})();
