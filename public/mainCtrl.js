angular.module('myApp', ['uiGmapgoogle-maps'])
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

});