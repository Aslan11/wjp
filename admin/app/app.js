


	/*	Define Angular Module
	---------------------------------------------------------------------- */
	var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.ace']);

	/*	Routing
	---------------------------------------------------------------------- */
	app.config(function($routeProvider){
		$routeProvider.
			when('/stories', {
				templateUrl: 'templates/stories.html',
				controller: 'storiesController'
			}).
			when('/stories/create', {
				templateUrl: 'templates/story.html',
				controller: 'editStoryController'
			}).
			when('/stories/:_id', {
				templateUrl: 'templates/story.html',
				controller: 'editStoryController'
			}).
			when('/experiences', {
				templateUrl: 'templates/experiences.html',
				controller: 'experiencesController'
			}).
			when('/experiences/create', {
				templateUrl: 'templates/experience.html',
				controller: 'editExperienceController'
			}).
			when('/experiences/:_id', {
				templateUrl: 'templates/experience.html',
				controller: 'editExperienceController'
			}).
			when('/tracks', {
				templateUrl: 'templates/tracks.html',
				controller: 'tracksController'
			}).
			when('/tracks/create', {
				templateUrl: 'templates/track.html',
				controller: 'editTrackController'
			}).
			when('/tracks/:_id', {
				templateUrl: 'templates/track.html',
				controller: 'editTrackController'
			}).
			otherwise({
				redirectTo: '/stories'
			});
	});



	/*	Main Controller
	---------------------------------------------------------------------- */
	app.controller('mainController', function($scope, $location){
		// Set active sidebar item
		$scope.isActive = function(route){ return route == $location.path(); }
	});

	/*	Stories Controller
	---------------------------------------------------------------------- */
	app.controller('storiesController', function($scope, Stories){
		$scope.status = 'active';
		$scope.stories = Stories.query({sort:'order'});
	});

	app.filter('reverse', function() {
	  return function(items) {
	    return items.slice().reverse();
	  };
	});



	/*	Edit or Create Story Controller
	---------------------------------------------------------------------- */
	app.controller('editStoryController', function($scope, Story, Stories, $routeParams, $location){
		$scope.devTab = 'html';


		//Time Stamp Stories
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		var month = '';

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm == 1){
			mm = 'January';
		}else if(mm == 2){
			mm = 'February';
		}else if(mm == 3){
			mm = 'March';
		}else if(mm == 4){
			mm = 'April';
		}else if(mm == 5){
			mm = 'May';
		}else if(mm == 6){
			mm = 'June';
		}else if(mm == 7){
			mm = 'July';
		}else if(mm == 8){
			mm = 'August';
		}else if(mm == 9){
			mm = 'September';
		}else if(mm == 10){
			mm = 'Octiober';
		}else if(mm == 11){
			mm = 'November';
		}else if(mm == 12){
			mm = 'December';
		}

		today = mm+' '+dd+', '+yyyy;

		// Create or Edit ?
		if( $routeParams._id ){
			var edit = true;
			$scope.story = Story.get({_id: $routeParams._id});
		} else {
			var edit = false;
			$scope.story = {
				pageViews: 1,
				date: today,
				author: 'Weston James Palmer',
				status: 'inactive',
				hasVideo: 'no',
				isFeatured: 'no',
				css: '.img-full{width: 100%;} .img-half{width: 50%; float: left;} .img-third{width: 33.333333%; float: left;}'
			};
		}

		// Save
		$scope.save = function(redirect){
			if(edit) Story.update({_id: $routeParams._id}, $scope.story); // update
			if(!edit) Stories.save( $scope.story ); // create
			if(redirect) $location.path('/stories'); // redirect
		};

		// Delete Story
		$scope.delete = function(){
			if( confirm('Are you sure you want to delete this story?') ){
				Story.delete({_id: $routeParams._id}, function(res){
					$location.path('/stories');
				});
			}
		};
	});



	/*	Experiences Controller
	---------------------------------------------------------------------- */
	app.controller('experiencesController', function($scope, Experiences){
		$scope.status = 'active';
		$scope.experiences = Experiences.query({sort:'order'});
	});



	/*	Edit or Create experience Controller
	---------------------------------------------------------------------- */
	app.controller('editExperienceController', function($scope, Experience, Experiences, $routeParams, $location){
		$scope.devTab = 'html';


		//Time Stamp
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		var month = '';

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm == 1){
			mm = 'January';
		}else if(mm == 2){
			mm = 'February';
		}else if(mm == 3){
			mm = 'March';
		}else if(mm == 4){
			mm = 'April';
		}else if(mm == 5){
			mm = 'May';
		}else if(mm == 6){
			mm = 'June';
		}else if(mm == 7){
			mm = 'July';
		}else if(mm == 8){
			mm = 'August';
		}else if(mm == 9){
			mm = 'September';
		}else if(mm == 10){
			mm = 'Octiober';
		}else if(mm == 11){
			mm = 'November';
		}else if(mm == 12){
			mm = 'December';
		}

		today = mm+' '+dd+', '+yyyy;

		// Create or Edit ?
		if( $routeParams._id ){
			var edit = true;
			$scope.experience = Experience.get({_id: $routeParams._id});
		} else {
			var edit = false;
			$scope.experience = {
				pageViews: 1,
				date: today,
				credits: 'Weston James Palmer',
				status: 'inactive',
				type: 'single'
			};
		}

		// Save
		$scope.save = function(redirect){
			if(edit) Experience.update({_id: $routeParams._id}, $scope.experience); // update
			if(!edit) Experiences.save( $scope.experience ); // create
			if(redirect) $location.path('/experiences'); // redirect
		};

		// Delete experience
		$scope.delete = function(){
			if( confirm('Are you sure you want to delete this experience?') ){
				Experience.delete({_id: $routeParams._id}, function(res){
					$location.path('/experiences');
				});
			}
		};
	});

	/*	Tracks Controller
	---------------------------------------------------------------------- */
	app.controller('tracksController', function($scope, Tracks){
		$scope.status = 'active';
		$scope.tracks = Tracks.query({sort:'order'});
	});



	/*	Edit or Create tracks Controller
	---------------------------------------------------------------------- */
	app.controller('editTrackController', function($scope, Track, Tracks, $routeParams, $location){

		//Time Stamp
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		var month = '';

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm == 1){
			mm = 'January';
		}else if(mm == 2){
			mm = 'February';
		}else if(mm == 3){
			mm = 'March';
		}else if(mm == 4){
			mm = 'April';
		}else if(mm == 5){
			mm = 'May';
		}else if(mm == 6){
			mm = 'June';
		}else if(mm == 7){
			mm = 'July';
		}else if(mm == 8){
			mm = 'August';
		}else if(mm == 9){
			mm = 'September';
		}else if(mm == 10){
			mm = 'Octiober';
		}else if(mm == 11){
			mm = 'November';
		}else if(mm == 12){
			mm = 'December';
		}

		today = mm+' '+dd+', '+yyyy;

		// Create or Edit ?
		if( $routeParams._id ){
			var edit = true;
			$scope.track = Track.get({_id: $routeParams._id});
		} else {
			var edit = false;
			$scope.track = {
				pageViews: 1,
				date: today,
				status: 'inactive'
			};
		}

		// Save
		$scope.save = function(redirect){
			if(edit) Track.update({_id: $routeParams._id}, $scope.track); // update
			if(!edit) Tracks.save( $scope.track ); // create
			if(redirect) $location.path('/tracks'); // redirect
		};

		// Delete track
		$scope.delete = function(){
			if( confirm('Are you sure you want to delete this track?') ){
				Track.delete({_id: $routeParams._id}, function(res){
					$location.path('/tracks');
				});
			}
		};
	});
















