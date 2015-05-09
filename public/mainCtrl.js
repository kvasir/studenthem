
angular.module('myApp', [])
	.controller('mainCtrl', function($http){
		var vm = this;
		vm.addUser = function(userName){	
			
			if(!userName) return false;
			
			$http.post('/users', { name: userName}).success(function(data) {
				//check the response code?
			});		
		}
		$http.get('/users').success(function(data){
			vm.users = data;
		});
	});