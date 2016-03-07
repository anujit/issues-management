var foodApp = angular.module('foodApp',['ngRoute','ui.bootstrap']);

(function(){
	console.log('Loading app.js');

	var TEMPLATES = {
		listTemplate : '/templates/list-template.html',
		addTemplate : '/templates/add-template.html',
		issueTemplate : '/templates/issue-template.html',
		reposTemplate : '/templates/repos-template.html'
	};

	foodApp.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){

		$routeProvider.when('/',{
			templateUrl : TEMPLATES.listTemplate,
			controller : 'ListCtrl as listCtrl'
		})
		.when('/add',{
			templateUrl : TEMPLATES.addTemplate,
			controller : 'AddCtrl as addCtrl'
		})
		.when('/issue',{
			templateUrl : TEMPLATES.issueTemplate,
			controller : 'IssueCtrl as issueCtrl'
		})
		.when('/add-issue',{
			templateUrl : TEMPLATES.addIssueTemplate,
			controller : 'AddIssueCtrl as addIssueCtrl'
		})
		.when('/:user/repos',{
			templateUrl : TEMPLATES.reposTemplate,
			controller : 'ReposCtrl as reposCtrl'
		})
		.otherwise({redirectTo : '/'});

		$locationProvider.hashPrefix('!');
	}])
	.constant('appConfig',{
		"api" : '/api/issues'
	});

	foodApp.directive('removeOnClick', ['FetchData',function(fetchData) {
	    return {
	        link: function(scope, elt, attrs) {
	            scope.remove = function(issue) {
									var id = issue._id;
									fetchData.getData({
										url : '/api/issues/'+id,
										method: 'DELETE'
									}).then(function(data){
										console.log(data);
										//elt.html('');
										elt.remove();
									});
	            };
	        }
	    }
	}]);

})();
