﻿var app = angular.module("StockApp", ["ngRoute"]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
     when('/home', {
         templateUrl: 'stockApp/home.html'
     }).
     when('/news', {
         templateUrl: 'stockApp/news.   '
     }).
    when('/portfolio/:username', {
        templateUrl: 'stockApp/portfolio.html',
        controller: 'PortfolioController'
    }).
     otherwise({
         redirectTo: '/home'
     });
}]);

app.controller("PortfolioController", function ($scope, UserService, $routeParams) {
    var username = $routeParams.username;
    $scope.currentUser = UserService.getCurrentuser();
});

app.controller("NavController", function ($scope, UserService) {
    $scope.currentUser = null;
    $scope.login = function () {
        var username = $scope.username;
        var password = $scope.password;
        $scope.currentUser = UserService.login(username, password);
    }

    $scope.logout = function () {
        $scope.currentUser = null;
        UserService.logout();
        $scope.username = null;
        $scope.password = null;
    }
});

app.factory("UserService", function () {
    var currentuser = null;
    var users = [
        { username: "johndoe", password: "1234" },
        { username: "janedoe", password: "1234" },
        { username: "admin", password: "admin" }
    ]

    var login = function (username, password) {
        for (var u in users) {
            if ((users[u].username == username) && (users[u].password == password)){
                currentuser = users[u];
                return users[u];
            }
        }
        return null;
    };

    var logout = function () {
        currentUser = null;
    }

    var getCurrentuser = function () {
        return currentuser;
    }

    return {
        login: login,
        getCurrentuser: getCurrentuser,
        logout: logout
    }
});