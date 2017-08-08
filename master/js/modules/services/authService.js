
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
            register: register,
            forgotPassword: forgotPassword,
            resetPassword: resetPassword,
            changePassword: changePassword
        };

        function isLoggedIn () {
            return (authToken.get(true) !== false) ? true : false;
        }

        function requestAuthToken (email, password) {

            var deferred = $q.defer();

            apiService.post('/email/signin', {
                email: email,
                password: password
            }).then(
                function(response) {

                    debugger;
                    deferred.resolve(response);
                },
                function(response) {
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        function setTocken (session) {
            debugger;
            var now = new Date();
            now.setHours(now.getHours() + 2);
            var expires = now;

            var token = session.accessToken;
            // var expires = session.time;

            authToken.save(token, expires);
        }

        function login (email, password) {

            var deferred = $q.defer();

            $cookies.remove('usertype', {
                path: '/'
            });
            authToken.delete();

            requestAuthToken(email, password).then(

                function(session) {
                    debugger;
                    setTocken(session);
                    deferred.resolve(session);
                },
                function(response) {
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        function register (name, username, email, password) {

            var deferred = $q.defer();

            apiService.post('/email/signup', {
                name: name,
                username: username,
                email: email,
                password: password
            }).then(

                function(session) {
                    debugger;
                    setTocken(session);
                    deferred.resolve(session);
                },
                function(response) {
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        function forgotPassword (email) {

            var deferred = $q.defer();
            var data = { email: email };

            apiService.post('/login/forgot', data, false).then(
                function(response) {
                    deferred.resolve(response);
                },
                function(response) {
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        function resetPassword (email, password, key) {

            var deferred = $q.defer();
            var data = { email: email, password: password, key: key };

            apiService.post('/login/reset', data, false).then(
                function(response) {
                    deferred.resolve(response);
                },
                function(response) {
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        function changePassword (currentPassword, newPassword) {

            var deferred = $q.defer();
            var data = { currentPassword: currentPassword, newPassword: newPassword };

            apiService.post('/password/change/', data, false).then(
                function(response) {
                    deferred.resolve(response);
                },
                function(response) {
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        function logout () {

            var deferred = $q.defer();

            apiService.post('/signout', false, true).finally(function() {
                debugger;
                $cookies.remove('usertype', {
                    path: '/'
                });
                authToken.delete();
                deferred.resolve();
            });

            return deferred.promise;
        }
    }
})();
