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
