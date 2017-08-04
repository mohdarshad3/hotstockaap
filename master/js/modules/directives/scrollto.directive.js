(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('scrollto', scrollto);

    // scrollto.$inject = ['$http', '$timeout'];

    function scrollto() {

        var directive = {
            restrict: 'A',
            link: link
        };
        return directive;

        function link(scope, element, attrs) {

          $(element).on('click', function (e) {
            var elem = $($(e.target).attr('href'));
            var offsetTop = elem.length ? elem.offset().top: window.scrollY;
            $('html, body').stop().animate({
              scrollTop: offsetTop
            }, 300);
            e.preventDefault();
          });

          scope.$on('$destroy', function(){
            $(element).off('click');
          });

        }
    }


})();
