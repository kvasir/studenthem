angular.module('myApp', ['uiGmapgoogle-maps'])

.config(function (uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		//    key: 'your api key',
		v: '3.17',
		libraries: 'places' // Required for SearchBox.
	});
})

.run(['$templateCache', function ($templateCache) {
	$templateCache.put('searchbox.tpl.html', '<input class="search-box-input" type="text" placeholder="Search">');
}])

.controller('mainCtrl', function ($http, uiGmapGoogleMapApi) {
	var vm = this;

	vm.map = { center: { latitude: 59.853631, longitude: 17.646774 }, zoom: 11 };







	var events = {
		places_changed: function (searchBox) { }
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