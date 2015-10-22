var app = angular.module("StockApp", []);

app.controller("StockController", function ($scope, $http) {
    $http.get("/api/user")
    .success(function (response) {
        $scope.users = response;
    })

    $scope.remove = function (index) {
        $http.delete("/api/user/" + index)
        .success(function (response) {
            $scope.users = response;
        });
    };
});