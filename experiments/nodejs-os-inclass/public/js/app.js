var app = angular.module("CMApp", []);

app.controller("CMController", function ($scope, $http) {
    // $scope.hello = "Hello from CM Controller";

    $scope.selectedSite= null;
    $scope.selectedIndex = null;

    $scope.select = function (index) {
        $scope.selectedIndex = index;
        $scope.selectedSite = $scope.websites[index];
    };

    $http.get("/api/website")
    .success(function (response) {
        $scope.websites = response;
    })

    $scope.add = function (site) {
        $http.post("/api/website/", site)
        .success(function (response) {
            $scope.websites = response;
        })
    };

    $scope.remove = function (index) {
        $http.delete("/api/website/" + index)
        .success(function (response) {
            $scope.websites = response;
        })
    };

    $scope.removePage = function (pageIndex) {
        $http.delete("/api/website/" +$scope.selectedIndex + "/page/" +pageIndex)
        .success(function (response) {
            $scope.websites = response;
            $scope.selectedSite = response[$scope.selectedIndex];
        });
    };
});

