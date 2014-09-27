/*	Stories Controller
---------------------------------------------------------------------- */
app.controller('storiesController', function($scope, Stories, $location, $timeout){
	$scope.stories = [];

	// Get Stories from API
	Stories.All.get({status: 'active', sort: 'order'}, function(stories){
		$scope.stories = stories;
	});
});
