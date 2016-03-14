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

	this.loading = true;

	var list = fetchData.getData({
		url : self.url,
		method : 'GET'
	}).then(function(data){
		console.log('List of issues -- ', data);
		self.loading = false;
		self.issues = data;
	});

	self.addIssue = function(){
		$location.path('add');
	};

	self.updateIssue = function(issue){
		self.editorEnabled[issue.name]=!self.editorEnabled[issue.name];
		console.log(issue);

		fetchData.getData({
			url : API_URL + '/' + issue._id,
			method : 'PUT',
			data : {
				description : issue.description
			}
		});
	}

}]);
