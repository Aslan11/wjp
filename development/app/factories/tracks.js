

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
