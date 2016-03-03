console.log('services.js');

foodApp.factory('CheckSession',[function(){
	var self = this;

	var obj = {};

	obj.check_if_logged_in = function(user){
		return sessionStorage.user === user && sessionStorage.auth_str ? true : false;
	}

	return obj;

}]);

foodApp.factory('FetchData',['$http','$q',function($http,$q){

	var self = this;

	var obj = {};

	obj.name = 'fetch data service';

	obj.getData = function(config){
		//return $http.jsonp(url + '&callback=JSON_CALLBACK');
		//var url = obj.url;
		var deferred = $q.defer();

		// var method = obj.method || 'GET';

		// var config = {
			// method : method
		// };

		//url += url.indexOf('?') != -1 ? '&' : '?';
		console.log(config);
		$http(config)
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(error){
			deferred.reject('Cannot load ' + config.url + ' -- ' + error.message);
		});

		return deferred.promise;

	}



	return obj;

}]);
