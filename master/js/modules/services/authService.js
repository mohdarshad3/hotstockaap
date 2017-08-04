(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('authService', authService);

    authService.$inject = ['$q', '$cookies', 'apiService', 'authToken'];

    function authService($q, $cookies, apiService, authToken) {

        return {
            isLoggedIn: isLoggedIn,
            login: login,
            logout: logout,
        };

        function isLoggedIn () {
            return (authToken.get(true) !== false) ? true : false;
        }

        function requestAuthToken (email, password) {
            var deferred = $q.defer();

            apiService.post('/login', {
                username: email,
                password: password
            }).then(
                function(response) {
                    deferred.resolve(response.session);
                },
                function(response) {
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        function setTocken (session) {
            var now = new Date();
            now.setHours(now.getHours() + 2);
            var expires = now;

            var token = session;
            // var expires = session.time;

            authToken.save(token, expires);
        }

        function login (email, password) {
            var deferred = $q.defer();
            $cookies.remove('usertype', {
                path: '/'
            });
            authToken.delete();
            if(email=='admin@hotstock.com' && password=='admin'){
                setTocken(Math.random());
                deferred.resolve(Math.random());
            }
            else
                deferred.reject('Invalid Credential.');

            return deferred.promise;
        }
        function logout () {
            var deferred = $q.defer();
            $cookies.remove('usertype', {
                path: '/'
            });
            authToken.delete();
            deferred.resolve();
            return deferred.promise;
        }
    }
})();
