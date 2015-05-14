angular.module('myApp', ['uiGmapgoogle-maps'])

.config(function (uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		//		key: 'your api key',
		v: '3.17',
		libraries: 'places' // Required for SearchBox.
	});
})

.run(['$templateCache', function ($templateCache) {
	$templateCache.put('searchbox.tpl.html', '<input class="search-box-input form-control" type="text" placeholder="Search">');
}])

.controller('mainCtrl', function ($http, uiGmapGoogleMapApi) {
	var vm = this;
	var uppsala = { latitude: 59.853631, longitude: 17.646774 };

	vm.map = {
		center: uppsala,
		zoom: 11
	};

	vm.marker = {
		id: 0
	};

	var events = {
		places_changed: function (searchBox) {
			console.log(searchBox);

			var places = searchBox.getPlaces();

			if (!places || places.length === 0) {
				console.log('no place data :(');
				return;
			}

			var newCenter = {
				latitude: places[0].geometry.location.lat(),
				longitude: places[0].geometry.location.lng()
			};

			vm.map = {
				center: newCenter,
				zoom: 18
			};

			// Temporary. We don't want a new marker on every search. We want the places to come from somewhere.
			vm.marker = {
				id: 0,
				coords: {
					latitude: places[0].geometry.location.lat(),
					longitude: places[0].geometry.location.lng()
				}
			};
		}
	};

	vm.options = {};

	uiGmapGoogleMapApi.then(function(maps) {
		var defaultBounds = new maps.LatLngBounds(
				new maps.LatLng(59.853631, 17.64677),
				new maps.LatLng(59.853631, 17.64677)
		);

		vm.options.bounds = defaultBounds;
	});

	vm.searchbox = { template: 'searchbox.tpl.html', events: events};
});
