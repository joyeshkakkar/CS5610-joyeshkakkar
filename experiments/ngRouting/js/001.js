var app = angular.module("StockApp", ["ngRoute"]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
     when('/home', {
         templateUrl: 'stockApp/home.html'
     }).
     when('/news', {
         templateUrl: 'stockApp/news.html'
     }).
    when('/portfolio', {
        templateUrl: 'stockApp/portfolio.html'
    }).
     otherwise({
         redirectTo: '/home'
     });
}]);