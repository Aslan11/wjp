/*	Experience Controller
---------------------------------------------------------------------- */
app.controller('experienceController', function($scope, $routeParams, Experiences, $location, $timeout, $sce, $window){

	var socket = document.getElementById('socket');

	socket.scrollTop = 100;

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
