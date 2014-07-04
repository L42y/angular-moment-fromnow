angular.module('l42y.moment.fromNow', []).directive('momentFromNow', function (
  $window,
  $timeout
) {
  function updateTime (element, time) {
    element.text($window.moment(time).fromNow());
  }

  return {
    restrict: 'EA',
    link: function ($scope, $element, $attrs) {
      $attrs.$observe('moment', function (time) {
        updateTime($element, time);
        var interval = $attrs.momentInterval | 1000;

        function countdown () {
          $timeout(function () {
            updateTime($element, time);

            countdown();
          }, interval);
        }

        countdown();
      });
    }
  };
});
