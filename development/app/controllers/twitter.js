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
