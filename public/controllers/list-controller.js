foodApp.controller('ListCtrl',['FetchData','$location','appConfig',function(fetchData,$location,appConfig){
	console.log('list controller created');

	var self = this;

	self.oneAtATime = false;


	self.status = {
	isFirstOpen: false,
	isFirstDisabled: false
};

	var API_URL = appConfig.api;

	//self.url = LIST_URL;
	self.url = API_URL;

	var list = fetchData.getData(self.url).then(function(data){
		console.log('List of issues -- ', data);
		self.issues = data;
	});

	self.addIssue = function(){
		$location.path('add');
	};

}]);
