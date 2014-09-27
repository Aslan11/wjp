
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