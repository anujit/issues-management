(function(){
	angular.module('foodApp').controller('LoginCtrl',['FetchData','$location',function(fetchData,$location){
		console.log('login controller');
		var self = this;
		self.submit = function(){

			var user_url = 'https://api.github.com/user';		
		
			var username = self.username;
			var password = self.password;


			var str = username + ':' + password;

			str = btoa(str);

			var auth_str = 'Basic ' + str;

			var config = {
				url : user_url,
				method:'GET',
				headers: {'Content-Type': 'application/json', 'Authorization': auth_str}
			}

			fetchData.getData(config).then(function(data){
				console.log('Login successful..');
				var obj = data;

					sessionStorage.auth_str = auth_str;
					sessionStorage.user = obj.login;

					
					$location.path('/');
			},function(err){
				console.log(err);
			});			
		}
	}]);
})();