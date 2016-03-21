(function(){
	angular.module('foodApp').directive('commentBox',[function(){
		return{
			template : '<div>Please enter your comments below</div>',
			replace : true
		}
	}]);
})();