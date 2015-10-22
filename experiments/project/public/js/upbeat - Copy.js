var app = angular.module("UpbeatApp", ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
     when('/home', {
         templateUrl: 'upbeat/home.html'
         ,controller: 'HomeController'
     }).
     when('/about', {
         templateUrl: 'upbeat/about.html'
     }).
    when('/profile/:username', {
        templateUrl: 'upbeat/profile.html'
        , controller: 'ProfileController'
    }).
     otherwise({
         redirectTo: '/home'
     });
}]);

app.controller("HomeController", function ($scope, $http, UpbeatService) {
    $scope.searchTracks = function () {        
        UpbeatService.searchTracks($scope.searchByTitle, function (response) {
            $scope.tracks = response.tracks.items;
        });
    }

    $scope.removeTrack = function (track) {
        var index = $scope.tracks.indexOf(track);
        $scope.tracks.splice(index, 1);
    }

    $scope.addTrackToFavorites = function (track) {
        alert(track.id);
        $http.post("/api/userMD", track.id)
        .success(function (response) {
            $scope.users = response;
            $scope.user = null;
        });
    }

});

app.controller("ProfileController", function ($scope, UpbeatService) {
    var fav = UpbeatService.getFavorites();
    console.log(fav);
    //$scope.favoriteTracks = fav;
});

app.controller("NavController", function ($scope, $http, UpbeatService) {
    $scope.currentUser = null;
    $scope.login = function () {
        var user = $scope.user;
        var username = user.username;
        var password = user.password;
        console.log("user-->" + user);
        console.log("userName-->" + username);
        console.log("password-->" + password);
        $http.post("/api/login", $scope.user)
         .success(function (response) {
             $scope.currentUser = response;
         })
         .error(function (response) {
             console.log("username or password is incorrect");
             alert("username or password is incorrect");
             console.log(response);
         });
    }   

    $scope.logout = function () {
        $http.post("/api/logout");
        $scope.currentUser = null;
        $scope.user = null;
    }
});