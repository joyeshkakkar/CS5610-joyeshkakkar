app.controller("LoginController", function ($scope, $http, $rootScope, $location) {
    $scope.currentUser = null;
    $scope.invalid = false;

    /*Calling server function to send server messages*/
    $scope.login = function (user) {
        $http.post("/api/login", user)
         .success(function (response) {
             $rootScope.currentUser = response;
             $scope.currentUser = response;
             $scope.invalid = false;
             /*Traversing to profile page of user*/
             $location.url("/profile/");
         })
         .error(function (response) {
             console.log("username or password is incorrect");
             $scope.invalid = true;
             console.log(response);
         });        
    }
    /*Hiding the label on change of a field*/
    $scope.change = function (response) {
        $scope.invalid = false;
    }
});