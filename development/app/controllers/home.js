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
