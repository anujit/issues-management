console.log('comment text');

(function(){
	angular.module('foodApp').directive('commentText',['$location',function($location){
		return {
			template : '<div>Please <a class="login-anchor" ng-click="login()">log in </a>using your Github account to comment.</div>',
			replace : true,
			link : function($scope,ele,attrs){
				$scope.login = function(){
					$location.path('/login');
				}
			}
		}
	}]);
})();