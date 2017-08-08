/*!
 *
 * Angle - Bootstrap Admin App + AngularJS Material
 *
 * Version: 3.5.4
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

// APP START
// -----------------------------------

(function() {
    'use strict';

    angular
        .module('wtst', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.navsearch',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.utils',
            'app.material',
            'app.charts',
            'app.auths',
            'app.services',
            'app.directives',
            'app.wtst'
        ]);
})();
