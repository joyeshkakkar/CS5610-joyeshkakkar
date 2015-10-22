var app = angular.module("BasicMoviesApp", []);

app.controller("BasicMovieController",
    function ($scope) {
        var movies = [
            { title: "Rush", year: 2009, plot: "The merciless 1970s rivalry between Formula One rivals James Hunt and Niki Lauda." },
            { title: "The Shawshank Redemption", year: 1994, plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency." },
            { title: "The Prestige ", year: 2006, plot: "Two stage magicians engage in competitive one-upmanship in an attempt to create the ultimate stage illusion." }
        ];

        $scope.movies = movies;

        $scope.addMovie = function () {
            var newMovie = {
                title: $scope.movie.title,
                year: $scope.movie.year,
                plot: $scope.movie.plot
            };
            $scope.movies.push(newMovie);
        }

        $scope.removeMovie = function (movie) {
            var index = $scope.movies.indexOf(movie);
            $scope.movies.splice(index, 1);
        }
    });
