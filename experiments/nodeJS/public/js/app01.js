var app = angular.module("StockApp", []);

app.controller("StockController", function ($scope, $http) {
    $http.get("/api/user")
    .success(function (response) {
        $scope.users = response;
    })
        
});