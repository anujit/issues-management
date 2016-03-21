var foodApp = angular.module('foodApp',['ngRoute','ui.bootstrap']);

(function(){
	console.log('Loading app.js');

	var TEMPLATES = {
		listTemplate : '/templates/list-template.html',
		addTemplate : '/templates/add-template.html',
		loginTemplate : '/templates/login-template.html'
	};

	foodApp.config(['$routeProvider','$locationProvider','$httpProvider',function($routeProvider,$locationProvider,$httpProvider){

		$routeProvider.when('/',{
			templateUrl : TEMPLATES.listTemplate,
			controller : 'ListCtrl as listCtrl'
		})
		.when('/add',{
			templateUrl : TEMPLATES.addTemplate,
			controller : 'AddCtrl as addCtrl'
		})
		.when('/login',{
			templateUrl : TEMPLATES.loginTemplate,
			controller : 'LoginCtrl as loginCtrl'
		})
		.otherwise({redirectTo : '/'});

		$locationProvider.hashPrefix('!');
	}])
	.constant('appConfig',{
		"api" : '/api/issues'
	});



})();
