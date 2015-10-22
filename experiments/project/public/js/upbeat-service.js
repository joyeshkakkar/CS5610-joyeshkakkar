app.factory('UpbeatService', function UpbeatService($http) {
    var searchTracks = function (title, callback) {
        $http.get("https://api.spotify.com/v1/search?q=" + title + "&type=track&limit=10")
        .success(callback);
    }

    var searchAlbums = function (title, callback) {
        $http.get("https://api.spotify.com/v1/search?q=" + title + "&type=album&limit=10")
        .success(callback);
    }

    var searchArtists = function (title, callback) {
        $http.get("https://api.spotify.com/v1/search?q=" + title + "&type=artist&limit=10")
        .success(callback);
    }

    var searchTrackById = function (id, callback) {
        $http.get("https://api.spotify.com/v1/tracks/" + id)
        .success(callback);
    }

    var searchAlbumById = function (id, callback) {
        $http.get("https://api.spotify.com/v1/albums/" + id)
        .success(callback);
    }

    var searchArtistById = function (id, callback) {
        $http.get("https://api.spotify.com/v1/artists/" + id)
        .success(callback);
    }

    return {
        searchTracks: searchTracks,
        searchAlbums: searchAlbums,
        searchArtists: searchArtists,
        searchTrackById: searchTrackById,
        searchAlbumById: searchAlbumById,
        searchArtistById: searchArtistById
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