  angular.module('foodApp').directive('inlineEditing',[function(){
    return {
      scope : {
        label : '=',
        value : '=',
        change : '&',
        editBtn : '@'
      },
      replace:true,
      template : '<div><b>{{label}} : </b><span ng-click="edit()" ng-hover="hover()" ng-hide="editmode">{{value}}</span><input on-blur="removeEdit()" on-enter="updateEdit()" ng-model="value" ng-blur="removeEdit()"></input></div>',
      link : function($scope,ele,attrs){
        $scope.editmode = false;

        // first hide the input element
        var inputElement = angular.element(ele.children()[2]);
        inputElement.attr('style','display:none;');


        // to enable edit mode on clicking the text
        $scope.edit = function(){
          $scope.editmode = true;
          inputElement.attr('style','display:inline-block;');
          inputElement[0].focus();

          $scope.editBtn = false;
        };

        // to disable the edit mode..
        $scope.removeEdit = function(){
          // if this function is already invoked, then return..
          if($scope.editmode == false) return;

          $scope.editmode = false;
          inputElement.attr('style','display:none;');
          $scope.change();
        };



        attrs.$observe('editBtn',function(v){
          if(v){
            $scope.edit();
          }
        });
      }
    };
  }]);
