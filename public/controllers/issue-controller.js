(function(){
	angular.module('foodApp')
	.controller('IssueCtrl',['FetchData','$location',function(fetchData,$location){
		console.log('issue controller');

		var self = this;

		var user_url = 'https://api.github.com/user';

		self.submit = function(){
			var username = self.username;
			var password = self.password;


			var str = username + ':' + password;

			str = btoa(str);

			var auth_str = 'Basic ' + str;
			console.log(auth_str);
			var config = {
				headers: {'Content-Type': 'application/json', 'Authorization': auth_str}
			}

			fetchData.getData(user_url,config).then(function(data){
				console.log('Login successful..');
				var obj = data;

					sessionStorage.auth_str = auth_str;
					sessionStorage.user = obj.login;

					
					$location.path(obj.login + '/repos');
			},function(err){
				console.log(err);
			});
		};
	}])
})();
