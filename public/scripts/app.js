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
/*	Experience Factory
---------------------------------------------------------------------- */
app.factory('Experiences', function($resource){
	return {
		All: $resource('/api/experiences', {}, {
			get: { method: 'GET', isArray: true }	// Get All Stories
		}),
		Single: $resource('/api/experiences/:id', {id: '@id'}, {
			get: { method: 'GET' },		// Get Story by ID
			update: { method: 'PUT' }	// Update Story 			
		})
	};
});

/*	Story Factory
---------------------------------------------------------------------- */
app.factory('Stories', function($resource){
	return {
		All: $resource('/api/stories', {}, {
			get: { method: 'GET', isArray: true }	// Get All Stories
		}),
		Single: $resource('/api/stories/:id', {id: '@id'}, {
			get: { method: 'GET' },		// Get Story by ID
			update: { method: 'PUT' }	// Update Story 			
		})
	};
});


/*	Tracks Factory
---------------------------------------------------------------------- */
app.factory('Tracks', function($resource){
	return {
		All: $resource('/api/tracks', {}, {
			get: { method: 'GET', isArray: true }	// Get All Tracks
		}),
		Single: $resource('/api/tracks/:id', {id: '@id'}, {
			get: { method: 'GET' },		// Get Track by ID
			update: { method: 'PUT' }	// Update Track 			
		})
	};
});

//Responsive Angular directive
app.directive('resize', function($window) {
  return function($scope) {
    $scope.initializeWindowSize = function() {
      $scope.windowHeight = $window.innerHeight;
      $scope.windowWidth = $window.innerWidth;
      return $scope.windowWidth;
    };
    $scope.initializeWindowSize();
    return angular.element($window).bind('load resize', function() {
      var size = $scope.initializeWindowSize();
      if(size <= 760){
	      $scope.browserType = 'mobile';
      }else{
	      $scope.browserType = 'desktop';
      }
      
      return $scope.$apply();
    });
  };
});

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
                fade: true,
                speed: 2000,
                infinite: true
              });
            }, 2000);
        }
    };
});


/*	Experience Controller
---------------------------------------------------------------------- */
app.controller('experienceController', function($scope, $routeParams, Experiences, $location, $timeout, $sce){

	Experiences.All.get({slug: $routeParams.slug}, function(experience){
						
		// Redirect if slug not found
		if( !experience[0]._id ){ $location.path('/'); return false; } 

		// Send product info to view
		$scope.xp = experience[0];
		// View Count Functionality
		$scope.viewed = function(){
			var oldCount = $scope.xp.pageViews;
			var newCount = oldCount + 1;
			// Add view to story in database
			Experiences.Single.update({id: $scope.xp._id}, {
				pageViews: newCount
			}, function(res){
				$scope.xp = res;
			});
		};

		$scope.sanitize = function(snippet) {
	      return $sce.trustAsHtml(snippet);
	    };

		$scope.viewed();

		$scope.slides=[];

		if($scope.xp.slideURLS.one != null){
			$scope.slides.push($scope.xp.slideURLS.one);
		}
		if($scope.xp.slideURLS.two != null){
			$scope.slides.push($scope.xp.slideURLS.two);
		}
		if($scope.xp.slideURLS.three != null){
			$scope.slides.push($scope.xp.slideURLS.three);
		}
		if($scope.xp.slideURLS.four != null){
			$scope.slides.push($scope.xp.slideURLS.four);
		}
		if($scope.xp.slideURLS.five != null){
			$scope.slides.push($scope.xp.slideURLS.five);
		}
		if($scope.xp.slideURLS.six != null){
			$scope.slides.push($scope.xp.slideURLS.six);
		}

	});
});

/*	Experiences Controller
---------------------------------------------------------------------- */
app.controller('experiencesController', function($scope, Experiences, $location, $timeout, $sce){
	$scope.experiences = [];

	// Get Stories from API
	Experiences.All.get({status: 'active', sort: 'order'}, function(experiences){
		$scope.experiences = experiences;
	});

	$scope.sanitize = function(snippet) {
      return $sce.trustAsHtml(snippet);
    };
});

/*	Home Controller
---------------------------------------------------------------------- */
app.controller('homeController', function($scope, $sce, Tracks, Stories, Experiences, $location, $timeout, $http){

	$scope.tracks = [];

	// Get Tracks from API
	Tracks.All.get({status: 'active', sort: 'order'}, function(tracks){
		$scope.tracks = tracks;
	});

    $scope.sanitize = function(snippet) {
      return $sce.trustAsHtml(snippet);
    };

    $scope.stories = [];

	// Get Stories from API
	Stories.All.get({status: 'active', sort: 'order'}, function(stories){
		$scope.stories = stories;
	});

	$scope.experiences = [];

	// Get Stories from API
	Experiences.All.get({status: 'active', sort: 'order'}, function(experiences){
		$scope.experiences = experiences;
	});

	$scope.tweets = null;

    $http({method: 'GET', url: '/tweets'}).
	  success(function(data, status, headers, config) {
	    $scope.tweets = data;
	  }).
	  error(function(data, status, headers, config) {
	    alert('error');
	  });
});


/*	Main Controller
---------------------------------------------------------------------- */
app.controller('mainController', function($scope, $rootScope, $location, $route, $routeParams, $timeout, $http, $resource){

	//Get Current View From Router
	$scope.$on('$routeChangeSuccess', function(){
		$scope.currentView = $route.current.action;
	});

});
/*	Mobile Controller
---------------------------------------------------------------------- */
app.controller('mobileController', function($scope, $rootScope, $location, $route, $routeParams, $timeout, $resource){
	
	//Get Current View From Router
	$scope.$on('$routeChangeSuccess', function(){
		$scope.currentView = $route.current.action;
	});

});
/*	Music Controller
---------------------------------------------------------------------- */
app.controller('musicController', function($scope, $sce, Tracks, $location, $timeout){
	$scope.tracks = [];

	// Get Tracks from API
	Tracks.All.get({status: 'active', sort: 'order'}, function(tracks){
		$scope.tracks = tracks;
	});

    $scope.sanitize = function(snippet) {
      return $sce.trustAsHtml(snippet);
    };
});

/*	Stories Controller
---------------------------------------------------------------------- */
app.controller('storiesController', function($scope, Stories, $location, $timeout){
	$scope.stories = [];

	// Get Stories from API
	Stories.All.get({status: 'active', sort: 'order'}, function(stories){
		$scope.stories = stories;
	});
});

/*	story Controller
---------------------------------------------------------------------- */
app.controller('storyController', function($scope, $routeParams, Stories, $location, $timeout, $sce){

	Stories.All.get({slug: $routeParams.slug}, function(story){
						
		// Redirect if slug not found
		if( !story[0]._id ){ $location.path('/'); return false; } 

		// Send product info to view
		$scope.story = story[0];
		// View Count Functionality
		$scope.viewed = function(){
			var oldCount = $scope.story.pageViews;
			var newCount = oldCount + 1;
			// Add view to story in database
			Stories.Single.update({id: $scope.story._id}, {
				pageViews: newCount
			}, function(res){
				$scope.story = res;
			});
		};

		$scope.sanitize = function(snippet) {
	      return $sce.trustAsHtml(snippet);
	    };

		$scope.viewed();

	});
});

/*	Twitter Controller
---------------------------------------------------------------------- */
app.controller('twitterController', function($scope, $location, $timeout, $http){

	$http({method: 'GET', url: '/tweets'}).
	  success(function(data, status, headers, config) {
	    $scope.tweets = data;
	  }).
	  error(function(data, status, headers, config) {
	    alert('error');
	  });
	
});
