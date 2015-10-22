var app = angular.module("StockApp", []);

app.controller("StockController", function ($scope, $http) {
    $scope.selectedId = null;
    $scope.editMode = null;

    $http.get("/api/userMD")
     .success(function (response) {
         $scope.users = response;
     })

    $scope.remove = function (id) {
        $http.delete("/api/userMD/" + id)
        .success(function (response) {
            $scope.users = response;
        });
    };

    $scope.add = function (user) {
        $http.post("/api/userMD", user)
        .success(function (response) {
            $scope.users = response;
            $scope.user = null;
        });
    };

    $scope.select = function (id) {
        $scope.selectedId = id;
        $scope.editMode = "true";
        $http.get("/api/userMD/" + id)
        .success(function (response) {
            $scope.user = response;
        })
    };

    $scope.update = function (user) {
        $http.put("/api/userMD/" + $scope.selectedId, user)
        .success(function (response) {
            $scope.users = response;
        });
        $scope.editMode = null;
        $scope.user = {};
        $scope.selectedId = null;
    };    
});