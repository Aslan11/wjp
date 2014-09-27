/*	Experience Factory
---------------------------------------------------------------------- */
app.factory('Experiences', function($resource){
	return {
		All: $resource('/api/experiences', {}, {
			get: { method: 'GET', isArray: true }	// Get All Stories
		}),
		Single: $resource('/api/experiences/:id', {id: '@id'}, {
			get: { method: 'GET' },		// Get Story by ID
			update: { method: 'PUT' }	// Update Story 			
		})
	};
});