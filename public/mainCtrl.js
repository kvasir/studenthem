angular.module('myApp', ['uiGmapgoogle-maps'])

.config(function (uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		//		key: 'your api key',
		v: '3.17',
		libraries: 'places' // Required for SearchBox.
	});
})

.run(['$templateCache', function ($templateCache) {
	$templateCache.put('searchbox.tpl.html', '<input class="search-box-input" type="text" placeholder="Search">');
}])

.controller('mainCtrl', function ($http, uiGmapGoogleMapApi) {
	var vm = this;
	var uppsala = { latitude: 59.853631, longitude: 17.646774 };

	vm.map = { center: uppsala, zoom: 11 };

	vm.marker = {
		id: 0,
		coords: uppsala,
		options: { draggable: true },
		events: {
			dragend: function (marker, eventName, args) {
				vm.marker.options = {
					draggable: true,
					labelContent: 'lat: ' + vm.marker.coords.latitude + ' ' + 'lon: ' + vm.marker.coords.longitude,
					labelAnchor: '100 0',
					labelClass: 'marker-labels'
				};
			}
		}
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

			vm.marker = {
				id: 0,
				coords: newCenter
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
