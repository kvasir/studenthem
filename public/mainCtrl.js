angular.module('myApp', ['uiGmapgoogle-maps'])

.config(function (uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		//    key: 'your api key',
		v: '3.17',
		libraries: 'places' // Required for SearchBox.
	});
})

.run(['$templateCache', function ($templateCache) {
	$templateCache.put('searchbox.tpl.html', '<input id="pac-input" class="pac-controls" type="text" placeholder="Search">');
}])

.controller('mainCtrl', function ($http) {
	var vm = this;

	vm.map = { center: { latitude: 59.853631, longitude: 17.646774 }, zoom: 11 };

	vm.addUser = function (userName) {

		if (!userName) return false;

		$http.post('/users', { name: userName }).success(function (data) {
			//check the response code?
			populateUsers();
			vm.userName = '';
		});
	};

	var populateUsers = function () {
		$http.get('/users').success(function (data) {
			vm.users = data;

		});
	};

	populateUsers();

	var events = {
		places_changed: function (searchBox) { }
	};
	vm.searchbox = { template: 'searchbox.tpl.html', events: events };
});