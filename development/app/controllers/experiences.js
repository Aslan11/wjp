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
