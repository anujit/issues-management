	foodApp.controller('AddCtrl',['$http',function($http){
		var self = this;

		self.submit = function(){
			console.log('New review -- ', self.newReview);
			var url = '/api/issues';

			var config = {
			 data: self.newReview
			 //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			//  transformRequest: function(obj) {
	    //      var str = [];
	    //      for(var p in obj)
	    //      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	    //      return str.join("&");
	    //  }
		};

			$http.post(url,config)
			.success(function(data){
				console.log(data);
			})
			.error(function(error){
				console.log(error);
			});

		}
	}]);
