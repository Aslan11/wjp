//Responsive Angular directive
app.directive('slick', function() {
  return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function(scope, element, attrs) {
            setTimeout(function() {
              $('.slideshow').slick({
                autoplay: true,
                dots: true,
                fade: true
              });
            }, 1000);
        }
    };
});
