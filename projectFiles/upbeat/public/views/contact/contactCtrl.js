app.controller("ContactController", function ($scope, $http, $rootScope) {
    $scope.currentUser = $rootScope.currentUser;
    var currentUser = $rootScope.currentUser;
    if (currentUser != null) {
        /*Setting up user details if a user is logged in*/
        var sender = { username: currentUser.firstName + " " + currentUser.lastName , email: currentUser.email };
        $scope.sender = sender;
    }
    /*Calling the mail functions at server*/
    $scope.mailMe = function (sender) {
        $http.post("/api/sendMail", sender)
         .success(function (response) {
             console.log("mail sent");
             $scope.showMailSentMsg = "Your message is sent. Thanks!";
             $scope.sender = null;
         })
         .error(function (response) {
             console.log("mail not sent");             
         });
    }
});