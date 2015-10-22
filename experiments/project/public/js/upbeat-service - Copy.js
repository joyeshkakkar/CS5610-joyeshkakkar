app.factory('UpbeatService', function UpbeatService($http) {

    var favoriteTracks = [];

    var searchTracks = function (title, callback) {
        $http.get("https://api.spotify.com/v1/search?q=" + title + "&type=track")
        .success(callback);
    }

    var addToFavorites = function (movie) {
        favoriteMovies.push(movie);
    }

    var getFavorites = function () {
        return favoriteMovies;
    }

    return {
        searchTracks: searchTracks,
        addToFavorites: addToFavorites,
        getFavorites: getFavorites
    }
});

app.factory("UserService", function () {
    var currentuser = null;
    
    var login = function (user) {
        $http.post("/api/login", user)
         .success(function (response) {
             currentUser = response;
         })
         .error(function (response) {
             console.log("username or password is incorrect");
             alert("username or password is incorrect");
             console.log(response);
         });
    };

    var logout = function () {
        currentUser = null;
    }

    var getCurrentuser = function () {
        return currentuser;
    }

    return {
        login: login,
        getCurrentuser: getCurrentuser,
        logout: logout
    }
});