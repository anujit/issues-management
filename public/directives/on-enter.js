  angular.module('foodApp').directive('onEnter',[function(){
    var ENTER_KEY = 13;
    var ESCAPE_KEY = 27;

    return{

      scope : {
        onEnter : '&',
        onBlur : '&'
      },
      link : function(scope,ele,attrs){
        ele.on('keypress',function(e){
          if(e.which === ENTER_KEY){
            scope.onEnter();
          }

          if(e.which === ESCAPE_KEY){
            scope.editmode = false;
            scope.onBlur();
          }
        });
      }
    }
  }]);
