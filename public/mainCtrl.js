
angular.module('myApp', [])
	.controller('mainCtrl', function($http){
		var vm = this;
		
		vm.header = "Välkommen till STUDENTHEM!!!";
		vm.addUser = function(userName){	
			
			if(!userName) return false;
			
			$http.post('/users', { name: userName}).success(function(data) {
				//check the response code?
				populateUsers();
				vm.userName = '';
			});		
		}
		var populateUsers = function() {
			$http.get('/users').success(function(data){
			vm.users = data;
			
			});
		}
		
		populateUsers();
		
	});