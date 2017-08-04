(function() {
    'use strict';

    angular
        .module('app.material', [
            'ngMaterial'
          ])
        .config(function($mdThemingProvider) {

          var watstockPalette = $mdThemingProvider.extendPalette('cyan', {
            '500': '#24b8e3',
            '600': '#21b0d9',
            'contrastDefaultColor': 'light'
          });

          $mdThemingProvider.definePalette('watstock', watstockPalette);

          $mdThemingProvider.theme('default')
            .primaryPalette('watstock', {
              'default': '500'
            });
        });;
})();