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
