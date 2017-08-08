/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper){

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(true);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/');

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            .state('landing', {
              url: '/landing',
              templateUrl: 'app/pages/landing.html',
              resolve: helper.resolveFor('modernizr', 'icons')
            })
          .state('app', {
              url: '',
              abstract: true,
              templateUrl: helper.basepath('app.html'),
              resolve: helper.resolveFor('modernizr', 'icons', 'screenfull')
          })
          .state('app.home', {
              url: '/',
              title: 'Home',
              templateUrl: 'app/pages/home.html',
              resolve: helper.resolveFor('moment', 'moment-plugins', 'socket', 'loaders.css', 'spinkit', 'flot-chart', 'flot-chart-plugins'),
              onEnter: function($rootScope){
                $rootScope.app.layout.headerHome = true;
              },
              onExit: function($rootScope){
                $rootScope.app.layout.headerHome = false;
              }
          })

          .state('auth', {
              url: '/auth',
              templateUrl: 'app/pages/auth.html',
              resolve: helper.resolveFor('modernizr', 'icons', 'loaders.css'),
              controller: ['$rootScope', function($rootScope) {
                  $rootScope.app.layout.isBoxed = false;
              }]
          })
          .state('auth.login', {
              url: '/login',
              title: 'Login',
              templateUrl: 'app/pages/login.html'
          })
          .state('auth.register', {
              url: '/register',
              title: 'Register',
              templateUrl: 'app/pages/register.html'
          })
          .state('auth.forgotPassword', {
              url: '/forgot-password',
              title: 'Forgot Password',
              templateUrl: 'app/pages/forgot-password.html'
          })
          .state('auth.resetPassword', {
              url: '/reset-password?email&key',
              title: 'Reset Password',
              templateUrl: 'app/pages/reset-password.html'
          })
          .state('auth.changePassword', {
              url: '/change-password',
              title: 'Change Password',
              templateUrl: 'app/pages/change-password.html'
          })
          .state('auth.confirmation', {
              url: '/confirmation',
              title: 'Confirmation',
              templateUrl: 'app/pages/confirmation.html'
          })
          .state('auth.confirmAcount', {
              url: '/confirm-account',
              title: 'confirm-account',
              templateUrl: 'app/pages/confirm-account.html'
          })
            .state('profile1', {
                url: '/profile1',
                title: 'profile1',
                templateUrl: 'app/pages/profile1.html'
            })
            .state('confirmAccount', {
                url: '/confirmAccount',
                title: 'confirmAccount',
                templateUrl: 'app/pages/confirm-account.html'
            })

            //
         

          ;

    } // routesConfig

})();
