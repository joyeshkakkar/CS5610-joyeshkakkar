var app = angular.module("StockApp", ["ngRoute"]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
     when('/home', {
         templateUrl: 'stockApp/home.html'
     }).
     when('/news', {
         templateUrl: 'stockApp/news.html'
     }).
    when('/portfolio/:username', {
        templateUrl: 'stockApp/portfolio.html',
        controller: 'PortfolioController'
    }).
     otherwise({
         redirectTo: '/home'
     });
}]);

app.controller("PortfolioController", function ($scope, UserService, $routeParams, StockService) {
    var username = $routeParams.username;
    $scope.currentUser = UserService.getCurrentuser();
    $scope.stockList = StockService.getStockByIndices($scope.currentUser.stockList);

    $scope.removeStock = function (index) {
        UserService.removeStock(index);
        $scope.currentUser = UserService.getCurrentuser();
        $scope.stockList = StockService.getStockByIndices($scope.currentUser.stockList);
    }

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
        { username: "johndoe", password: "1234", stockList: [0, 1, 2, 3] },
        { username: "janedoe", password: "1234", stockList: [4, 5, 6] },
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

    var removeStock = function (index) {
        currentuser.stockList.splice(index, 1);
    }

    return {
        login: login,
        getCurrentuser: getCurrentuser,
        logout: logout,
        removeStock: removeStock
    }
});


app.factory("StockService", function () {
    var stocks = [
       { symbol: "AAPL" },
       { symbol: "AMZN" },
       { symbol: "FB" },
       { symbol: "GOOG" },
       { symbol: "GS" },
       { symbol: "MSFT" },
       { symbol: "ORCL" }
    ];
    var getStockByIndices = function (indices) {
        var responseStocks = [];
        for (var i in indices) {
            var stock = stocks[indices[i]];
            responseStocks.push(stock);
        }
        return responseStocks;
    };
    return {
        getStockByIndices: getStockByIndices
    }
});