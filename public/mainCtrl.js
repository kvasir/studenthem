angular.module('myApp', ['uiGmapgoogle-maps'])

.config(function (uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		//		key: 'your api key',
		v: '3.17',
		libraries: 'places' // Required for SearchBox.
	});
})

.run(['$templateCache', function ($templateCache) {
	$templateCache.put('searchbox.tpl.html', '<input class="search-box-input form-control" type="text" placeholder="Sök på område, gatunamn">');
}])

.factory('locationService', function($http){
	var locationCall = $http.get('data/locations.json');
    var locations;

    locationCall.success(function (data) {
        locations = data;
    });


	return {
		locations : function(){
			return locationCall.then(function(){
				return locations;
			});
		}
	}
})


.controller('mainCtrl', function ($http, uiGmapGoogleMapApi, locationService) {

	var vm = this;
	var startZoom = 13;
	var searchZoom = 17;
	var uppsala = { latitude: 59.853631, longitude: 17.646774 };

	vm.nationer = [];
	vm.nightclubs = [];

	locationService.locations().then(function(locations){
		vm.nationer = locations.nationer;
		vm.nightclubs = locations.nightclubs;

		for(var i = 0; i < vm.nationer.length; i++) {
			vm.nationer[i].icon = 'images/beer-icon.png';
		};

		for(var i = 0; i < vm.nightclubs.length; i++) {
			vm.nightclubs[i].icon = 'images/home-icon.png';
		};
	});

	vm.map = {
		center: uppsala,
		zoom: startZoom
	};

	vm.showInformation = function(data){
		console.log(data.model);
		if(data.model.type === "nightclub") {
			data.model.icon = 'images/home-icon-visited.png';
		} else {
			data.model.icon = 'images/beer-icon-visited.png';
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
