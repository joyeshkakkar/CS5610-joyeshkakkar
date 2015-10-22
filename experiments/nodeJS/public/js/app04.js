var app = angular.module("StockApp", []);

app.controller("StockController", function ($scope, $http) {
    $scope.selectedIndex = null;
    $scope.editMode = null;

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

    $scope.add = function (user) {
        $http.post("/api/user", user)
        .success(function (response) {
            $scope.users = response;
            $scope.user = null;
        });
    };
    
    $scope.select = function (index) {
        $scope.selectedIndex = index;
        $scope.editMode = "true";
        $scope.user = $scope.users[index];
    };

    $scope.update = function (user) {
        $http.put("/api/user/" + $scope.selectedIndex, user)
        .success(function (response) {
            $scope.users = response;
        });
        $scope.editMode = null;
        $scope.user = {};
        $scope.selectedIndex = null;
    };
});