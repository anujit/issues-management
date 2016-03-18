	foodApp.controller('AddCtrl',['$http','$location','FetchData',function($http,$location,fetchData){
		var self = this;

		self.submit = function(){
			console.log('New review -- ', self.newReview);
			var url = '/api/issues';

			var config = {
				url : url,
				data: self.newReview,
				method : 'POST'
			};
			
			self.loading = false;
			
			fetchData.getData(config)
			.then(function(data){
				console.log(data);
				self.loading = true;
				$location.path('/');			
			},function(e){
				console.log(e);
			});
		}
	}]);
