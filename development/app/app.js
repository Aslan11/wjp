/*	Define Angular App
---------------------------------------------------------------------- */
var app = angular.module('app', ['ngRoute', 'ngResource', 'ngAnimate', 'ngCookies', 'ngSanitize', 'ngTouch']);

app.config(function($httpProvider, $routeProvider, $locationProvider){
	$routeProvider.
		when('/', {
			action: 'home'
		}).
		
		when('/stories', {
			action: 'stories'
		}).

		when('/story/:slug', {
			action: 'story'
		}).

		when('/experience/:slug', {
			action: 'experience'
		}).
		
		when('/gallery', {
			action: 'gallery'
		}).
		
		when('/music', {
			action: 'music'
		}).

		when('/twitter', {
			action: 'twitter'
		}).
		
		when('/instagram', {
			action: 'instagram'
		}).
		
		otherwise({ redirectTo: '/' });

	// Remove "#" from the URL (Except for IE < 10)
	if(window.history && window.history.pushState){
		$locationProvider.html5Mode(true);
	}
});

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});