angular.module('gotAPP', [])
  .controller('battleController', function($scope,$http) {

    var battle = this;
    function resetData(){
      battle.list=null;
      battle.stats=null;
      battle.count=null;
      battle.search=null;
    }
    battle.loading =false;

    function loading(){
      battle.loading = 'fetching Data from API...'
    }
    battle.loadList = function(){
      resetData();
      loading();
      $http.get("http://localhost:3000/list")
        .then(function(response) {
            console.log(response.data);
            battle.loading =false;
            battle.list = response.data;
        });
    };
    battle.loadStats = function(){
      resetData();
      loading();
      $http.get("http://localhost:3000/stats")
        .then(function(response) {
            console.log(response.data);
            battle.loading =false;
            battle.stats = response.data;
        });
    };

    battle.loadCount = function(){
      resetData();
      loading();
      $http.get("http://localhost:3000/count")
        .then(function(response) {
            console.log(response.data);
            battle.loading =false;
            battle.count = response.data;
        });
    };

    battle.loadSearch = function(){
      resetData();
      loading();
      if(battle.searchBar == null || battle.searchBar.indexOf('=') === -1){
        battle.loading ='Enter Query to search, for example: king=Robb Stark&location=Riverrun&type=siege';
      }else{

      var url ="http://localhost:3000/search?"+battle.searchBar;
      $http.get(url)
        .then(function(response) {
            console.log(response.data);
            battle.loading =false;
            battle.search = response.data;
        });
      }

    };



  });
