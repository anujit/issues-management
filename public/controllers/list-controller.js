foodApp.controller('ListCtrl',['FetchData','$location','appConfig','$timeout','CheckSession',function(fetchData,$location,appConfig,$timeout,checkSession){
	console.log('list controller created');

	var self = this;

	self.oneAtATime = false;

	self.commentText = 'You need to log in to comment';
	sessionStorage.user = 'anujit';
	console.log();

	self.comments = [];

	self.status = {
		isFirstOpen: false,
		isFirstDisabled: false
	};
	
	self.isLoggedIn = checkSession.check_if_logged_in();
	console.log(self.isLoggedIn);
	var API_URL = appConfig.api;

	//self.url = LIST_URL;
	self.url = API_URL;

	self.comments_url = 'https://api.github.com/repos/anujit/issues-management/issues/1/comments';

	this.loading = true;

	var list = fetchData.getData({
		url : self.url,
		method : 'GET'
	}).then(function(data){
		console.log('List of issues -- ', data);
		self.loading = false;
		self.issues = data;

		// if logged in, show the comments box..

		//load comments now..
		self.getComments();
	});

	self.showDescription = false;

	self.addIssue = function(){
		$location.path('add');
	};

	self.getComments = function(){
		fetchData.getData({
			url : self.comments_url,
			method : 'GET'
		}).then(function(data){
			self.comments = data;
		});
	};

	self.updateIssue = function(issue){
		//if(self.editorEnabled) self.editorEnabled[issue._id]=!self.editorEnabled[issue._id];
		console.log(issue);
		fetchData.getData({
			url : API_URL + '/' + issue._id,
			method : 'PUT',
			data : {
				description : issue.description,
				name:issue.name,
				reported_by : issue.reported_by
			}
		});
	}

	self.hideOnClick = function(issue){
		console.log(issue);
		console.log(self.showDescription,self.editorEnabled);
		//if(self.showDescription) self.showDescription = false;

		//if(self.editorEnabled && self.editorEnabled[issue._id]) self.editorEnabled[issue._id] = false;
	}

}]);
