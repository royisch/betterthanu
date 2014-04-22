angular.module('App')

    .controller('DemoCtrl', ['$rootScope','$scope',function($rootScope,$scope) {

        $scope.openMenu = false;

        $scope.menuClicked= function(){
            $scope.openMenu = !$scope.openMenu;
        };

        $scope.closeMenu= function(){
            $scope.menuClicked();
        };

        $scope.changePage= function(idx){
            $rootScope.$broadcast('change_page',idx);
            $scope.menuClicked();
        };

    }])
    .controller('splashCtrl', ['$scope','$http','$location','$timeout',
        function($scope,$http,$location,$timeout) {
            function cb(){
                $scope.fade = true;
                $timeout(function(){
                    $location.path("/inside");
                }, 1000);
            }

            $timeout(cb, 2000);

    }])
    .controller('tableCtrl', ['$scope','$http','$location','$timeout',
        function($scope,$http,$location,$timeout) {
                $scope.groups ={
                        "A":[{
                            "rank" : "1",
                            "teamName" : "Brazil",
                            "gamesPlayed" : "3",
                            "gamesWon" : "1",
                            "gamesDraw" : "1",
                            "gamesLost" : "1",
                            "goals" : "3-7",
                            "points" : "4"
                        },{
                            "rank" : "2",
                            "teamName" : "Argentina",
                            "gamesPlayed" : "3",
                            "gamesWon" : "1",
                            "gamesDraw" : "0",
                            "gamesLost" : "2",
                            "goals" : "2-4",
                            "points" : "3"
                        },{
                            "rank" : "3",
                            "teamName" : "Ecuador",
                            "gamesPlayed" : "3",
                            "gamesWon" : "0",
                            "gamesDraw" : "1",
                            "gamesLost" : "2",
                            "goals" : "4-1",
                            "points" : "1"
                        },{
                            "rank" : "4",
                            "teamName" : "Colombia",
                            "gamesPlayed" : "3",
                            "gamesWon" : "0",
                            "gamesDraw" : "0",
                            "gamesLost" : "3",
                            "goals" : "0-7",
                            "points" : "0"
                        }],
                    "B":[{
                        "rank" : "1",
                        "teamName" : "Brazil",
                        "gamesPlayed" : "3",
                        "gamesWon" : "1",
                        "gamesDraw" : "1",
                        "gamesLost" : "1",
                        "goals" : "3-7",
                        "points" : "4"
                    },{
                        "rank" : "2",
                        "teamName" : "Argentina",
                        "gamesPlayed" : "3",
                        "gamesWon" : "1",
                        "gamesDraw" : "0",
                        "gamesLost" : "2",
                        "goals" : "2-4",
                        "points" : "3"
                    },{
                        "rank" : "3",
                        "teamName" : "Ecuador",
                        "gamesPlayed" : "3",
                        "gamesWon" : "0",
                        "gamesDraw" : "1",
                        "gamesLost" : "2",
                        "goals" : "4-1",
                        "points" : "1"
                    },{
                        "rank" : "4",
                        "teamName" : "Colombia",
                        "gamesPlayed" : "3",
                        "gamesWon" : "0",
                        "gamesDraw" : "0",
                        "gamesLost" : "3",
                        "goals" : "0-7",
                        "points" : "0"
                    }]
                    };
            $scope.group = $scope.groups['A'];
        }])
    .controller('createGroupCtrl', ['$rootScope','$scope','$http','$location','$timeout',
        function($rootScope, $scope,$http,$location,$timeout) {

            $scope.searching = false;

            $rootScope.$on('change_page',function(event,idx){
                $scope.template = $scope.templates[idx];
            });

            $scope.templates =
                [ { name: 'createGroup', url: 'partials/test.html'},
                    { name: 'addUser', url: 'partials/puta.html'},
                    { name: 'tables', url: 'partials/tables.html'}];
            $scope.template = $scope.templates[0];

            $scope.search = function(){
                $scope.searching = true;
                $http({method: 'GET', url: 'data/data.json'}).
                 success(function(data, status, headers, config) {
                     $scope.users = data;
                 }).
                 error(function(data, status, headers, config) {
                    //alert('error!');
                 });
            };

            $scope.clearSearch = function(){
                $scope.searching = false;
                $scope.users = [];
            };

            $scope.changePage = function(event, idx){
                $scope.template = $scope.templates[idx];
            };

            $scope.userSelected = function($index){
                $http({method: 'POST', url: '/addUserToGroup' ,data:$scope.users[$index]}).
                    success(function(data, status, headers, config) {
                        //alert('selected');
                        $scope.clearSearch();
                    }).
                    error(function(data, status, headers, config) {
                        //alert('error!');
                        $scope.clearSearch();
                    });
            };

            $scope.goToAddUserScreen = function(){
                $http({method: 'POST', url: '/createGroup' ,data:$scope.groupName}).
                    success(function(data, status, headers, config) {
                        //alert('selected');
                        $scope.template = $scope.templates[1];
                    }).
                    error(function(data, status, headers, config) {
                        //alert('error!');
                        $scope.template = $scope.templates[1];
                });
            }

    }]);