/**=========================================================
 * Module: profile1.controller.js
 * Demo for profile1Controller api
 =========================================================*/
(function() {
    'use strict';
    angular
        .module('app.auths')
        .controller('Profile1Controller', Profile1Controller);

    Profile1Controller.$inject = ['$rootScope', '$scope','$sce', '$http', '$state', 'authService'];

    function Profile1Controller($rootScope, $scope,$sce,$http, $state, authService) {
       

    }
})();