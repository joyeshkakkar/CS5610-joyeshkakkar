app.controller("LogoutController", function ($scope, $http, $rootScope) {
    /*Calling the methods at server*/
    $http.post("/api/logout");
    /*Removing the parameters from scope*/
    $scope.currentUser = null;
    $rootScope.currentUser = null;
    $scope.user = null;
});