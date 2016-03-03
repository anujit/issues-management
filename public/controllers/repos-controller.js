console.log('reposCtrl');
(function(){
  angular.module('foodApp')
  .controller('ReposCtrl',['FetchData','$routeParams','CheckSession','$location',function(fetchData,routeParams,checkSession,location){
    var self = this;
    var user = routeParams.user;
    self.user = user;
    // first check if auth_key and login name is present in sessionStorage..

    var logged_in = checkSession.check_if_logged_in(user);
    console.log(logged_in)
    //logged_in = false;
    if(logged_in){
      console.log('Loading Repos for '+user);

      var repos_url = '//api.github.com/users/'+user+'/repos';

      fetchData.getData(repos_url).then(function(repos){
          console.log(repos);

          self.repos = repos;

          
      });

    } else {
        location.path('/');
    }

  }])
})();
