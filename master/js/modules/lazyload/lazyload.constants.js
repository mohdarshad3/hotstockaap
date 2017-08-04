(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
          // jQuery based and standalone scripts
          scripts: {
            'modernizr':          ['vendor/modernizr/modernizr.custom.js'],
            'icons':              ['vendor/fontawesome/css/font-awesome.min.css',
                                   'vendor/simple-line-icons/css/simple-line-icons.css'],
            'weather-icons':      ['vendor/weather-icons/css/weather-icons.min.css',
                                   'vendor/weather-icons/css/weather-icons-wind.min.css'],
            'loadGoogleMapsJS':   ['vendor/load-google-maps/load-google-maps.js'],
            'socket':             ['vendor/socket.io-client/dist/socket.io.js'],
            'moment':             ['vendor/moment/moment.js'],
            'moment-plugins':     ['libs/moment/momentjs-business.js'],
            'screenfull':         ['vendor/screenfull/dist/screenfull.js'],
            'd3':                 ['vendor/d3/d3.js'],
            'halo-min':               ['libs/vizuly-halo/vizuly_core.min.js',
                                    'libs/vizuly-halo/vizuly_halo.min.js',
                                    'libs/vizuly-halo/theme_showreel.js'],
            'halo':               ['libs/vizuly-halo/namespace/namespace.js',
                                    'libs/vizuly-halo/theme/_theme.js',
                                    'libs/vizuly-halo/theme/halo.js',
                                    'libs/vizuly-halo/core/component.js',
                                    'libs/vizuly-halo/core/util.js',
                                    'libs/vizuly-halo/core/color.js',
                                    'libs/vizuly-halo/core/format.js',
                                    'libs/vizuly-halo/svg/_svg.js',
                                    'libs/vizuly-halo/svg/gradient.js',
                                    'libs/vizuly-halo/svg/filter.js',
                                    'libs/vizuly-halo/viz/_viz.js',
                                    'libs/vizuly-halo/viz/halo.js',
                                    'libs/vizuly-halo/theme_showreel.js'],
            'orb':                ['libs/orb-chart/trigonometry.js',
                                    'libs/orb-chart/arc.js',
                                    'libs/orb-chart/functor.js',
                                    'libs/orb-chart/source.js',
                                    'libs/orb-chart/target.js',
                                    'libs/orb-chart/arc-chord_002.js',
                                    'libs/orb-chart/arc-chord.js',
                                    'libs/orb-chart/gradients.js'],
            'flot-chart':         ['vendor/Flot/jquery.flot.js'],
            'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                                   'vendor/Flot/jquery.flot.resize.js',
                                   'vendor/Flot/jquery.flot.pie.js',
                                   'vendor/Flot/jquery.flot.time.js',
                                   'vendor/Flot/jquery.flot.categories.js',
                                   'vendor/flot-spline/js/jquery.flot.spline.min.js',
                                   'libs/Flot/jquery-flot-dashes.js'],
           'loaders.css':          ['vendor/loaders.css/loaders.css'],
           'spinkit':              ['vendor/spinkit/css/spinkit.css']
          },
          // Angular based script (use the right module name)
          modules: [
            // {name: 'toaster', files: ['vendor/angularjs-toaster/toaster.js', 'vendor/angularjs-toaster/toaster.css']}
            {name: 'ui.map',                    files: ['vendor/angular-ui-map/ui-map.js']}
          ]
        })
        ;

})();
