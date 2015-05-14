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
	var startZoom = 13;
	var searchZoom = 17;

	var uppsala = { latitude: 59.853631, longitude: 17.646774 };

	vm.map = {
		center: uppsala,
		zoom: startZoom
	};

	vm.randomMarkers = [
		{ id: 0, latitude: 59.8551874, longitude: 17.6381544 }, // Östgöta nation
		{ id: 1, latitude: 59.8533151, longitude: 17.6150677 }, // Studentvägen 32
		{ id: 2, latitude: 59.8548056, longitude: 17.6141013 }, // Studentvägen 4
		{ id: 3, latitude: 59.8499456, longitude: 17.5885325 }, // Sernanders väg 4
		{ id: 4, latitude: 59.862212,  longitude: 17.632527  }, // KLUBB ORANGE UPPSALA
		{ id: 5, latitude: 59.85887,   longitude: 17.630212  } // Södermanlands-Nerikes nation
	];

	var events = {
		places_changed: function (searchBox) {
			console.log(searchBox);

			var places = searchBox.getPlaces();

			if (!places || places.length === 0) {
				console.log('no place data :(');
				return;
			}

			vm.map = {
				center: {
					latitude: places[0].geometry.location.lat(),
					longitude: places[0].geometry.location.lng()
				},
				zoom: searchZoom
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
