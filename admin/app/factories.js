
/*	Stories Factory
---------------------------------------------------------------------- */
// All Stories
app.factory('Stories', function($resource){
	return $resource('/api/stories', {}, {
		query: { method: 'GET', isArray: true }, // Get all products
		create: { method: 'POST' }				 // Add new product
	});
});
// Single Story
app.factory('Story', function($resource){
	return $resource('/api/stories/:_id', {}, {
		get: { method: 'GET' },			// Get single product
		update: { method: 'PUT' },		// Update single product
		delete: { method: 'DELETE' } 	// Delete single product
	});
});

/*	Experiences Factory
---------------------------------------------------------------------- */
// All Experiences
app.factory('Experiences', function($resource){
	return $resource('/api/experiences', {}, {
		query: { method: 'GET', isArray: true }, // Get all products
		create: { method: 'POST' }				 // Add new product
	});
});
// Single Story
app.factory('Experience', function($resource){
	return $resource('/api/experiences/:_id', {}, {
		get: { method: 'GET' },			// Get single product
		update: { method: 'PUT' },		// Update single product
		delete: { method: 'DELETE' } 	// Delete single product
	});
});

/*	Tracks Factory
---------------------------------------------------------------------- */
// All Tracks
app.factory('Tracks', function($resource){
	return $resource('/api/tracks', {}, {
		query: { method: 'GET', isArray: true }, // Get all products
		create: { method: 'POST' }				 // Add new product
	});
});
// Single Track
app.factory('Track', function($resource){
	return $resource('/api/tracks/:_id', {}, {
		get: { method: 'GET' },			// Get single product
		update: { method: 'PUT' },		// Update single product
		delete: { method: 'DELETE' } 	// Delete single product
	});
});