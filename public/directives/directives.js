(function(){
  angular.module('foodApp').directive('removeOnClick', ['FetchData',function(fetchData) {
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
