var app = angular.module("UpbeatApp", ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
     when('/home', {
         templateUrl: 'upbeat/home.html'
         , controller: 'HomeController'
     }).
     when('/about', {
         templateUrl: 'upbeat/about.html'
     }).
    when('/signup', {
        templateUrl: 'upbeat/signUp.html'
        , controller: 'SignupController'
    }).
    when('/profile', {
        templateUrl: 'upbeat/profile.html'
        , controller: 'ProfileController'
        , resolve: {
            loggedin: checkUserLoggedin
        }
    }).
     otherwise({
         redirectTo: '/home'
     });
}]);

// method outside any code
var checkUserLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();
    console.log("at the top");
    $http.get('/api/loggedin').success(function (user) {
        $rootScope.errorMessage = null;
        console.log("in get");
        //user is Authenticated
        // console.log(user);
        if (user != '0') {
            console.log(user);
            console.log("user found");
            $rootScope.currentUser = user;
            deferred.resolve();
        } else {
            console.log("user not found");
            $rootScope.errorMessage = "you need to login";
            deferred.reject();
            $location.url("/login");
        }
    });
}

app.controller("SignupController", function ($scope, $http, $rootScope, UpbeatService) {
    $scope.signup = function () {
        $http.post("/api/user", $scope.user)
         .success(function (response) {
             $rootScope.currentUser = response;
             $scope.currentUser = response;
             $scope.userAddMessage = "User is added. Please login."
         })
    }
});

app.controller("HomeController", function ($scope, $http, $rootScope, UpbeatService) {
    $scope.search = function () {
        UpbeatService.searchTracks($scope.searchByTitle, function (response) {
            $scope.tracks = response.tracks.items;
        });
        UpbeatService.searchAlbums($scope.searchByTitle, function (response) {
            $scope.albums = response.albums.items;
        });
        UpbeatService.searchArtists($scope.searchByTitle, function (response) {
            $scope.artists = response.artists.items;
        });
    }

    $scope.removeTrack = function (track) {
        var index = $scope.tracks.indexOf(track);
        $scope.tracks.splice(index, 1);
    }

    $scope.removeAlbum = function (album) {
        var index = $scope.albums.indexOf(album);
        $scope.albums.splice(index, 1);
    }

    $scope.removeArtist = function (artist) {
        var index = $scope.artists.indexOf(artist);
        $scope.artists.splice(index, 1);
    }

    $scope.addTrackToFavorites = function (track) {
        var currentUser = ($rootScope.currentUser);
        var trackToBeUpdated = { name: track.name, id: track.id };
        currentUser.tracks.push(trackToBeUpdated);

        $http.put("/api/user/" + currentUser._id, currentUser)
        .success(function (response) {
            $scope.users = response;
            //alert("Track \""+ track.name +"\" is added to favorites.");
        });
    }

    $scope.addAlbumToFavorites = function (album) {
        var currentUser = ($rootScope.currentUser);
        var albumToBeUpdated = { name: album.name, id: album.id };
        currentUser.albums.push(albumToBeUpdated);

        $http.put("/api/user/" + currentUser._id, currentUser)
        .success(function (response) {
            $scope.users = response;
            //alert("Album \"" + album.name + "\" is added to favorites.");
        });
    }

    $scope.addArtistToFavorites = function (artist) {
        var currentUser = ($rootScope.currentUser);
        var artistToBeUpdated = { name: artist.name, id: artist.id };
        currentUser.artists.push(artistToBeUpdated);

        $http.put("/api/user/" + currentUser._id, currentUser)
        .success(function (response) {
            $scope.users = response;
            //alert("Artist \"" + artist.name + "\" is added to favorites.");
        });
    }
});

app.controller("ProfileController", function ($scope, $http, $routeParams, $rootScope, UserService, UpbeatService, $modal) {
    currentUser = $rootScope.currentUser;
    $scope.currentUser = currentUser;
    $scope.favTracks = currentUser.tracks;
    $scope.favAlbums = currentUser.albums;
    $scope.favArtists = currentUser.artists;

    $scope.removeTrackFromFav = function (track) {
        var currentUser = $scope.currentUser;
        //alert(currentUser._id);
        var index = $scope.favTracks.indexOf(track);
        //alert(currentUser.tracks);
        currentUser.tracks.splice(index, 1);
        //alert(currentUser.tracks.length);
        $http.put("/api/user/" + currentUser._id, currentUser)
        .success(function (response) {
            var users = response;
            $scope.users = users;
        });
    }

    $scope.removeAlbumFromFav = function (album) {
        var currentUser = $scope.currentUser;
        var index = $scope.favAlbums.indexOf(album);
        currentUser.albums.splice(index, 1);
        $http.put("/api/user/" + currentUser._id, currentUser)
        .success(function (response) {
            $scope.users = response;
        });
    }

    $scope.removeArtistFromFav = function (artist) {
        //alert(artist);
        var currentUser = $scope.currentUser;
        var index = $scope.favArtists.indexOf(artist);
        currentUser.artists.splice(index, 1);
        $http.put("/api/user/" + currentUser._id, currentUser)
        .success(function (response) {
            $scope.users = response;
        });
    }

    $scope.viewArtistData = function (artist) {
        var favArtist = null;
        UpbeatService.searchArtistById(artist.id, function (response) {
            favArtist = response;
            var modalInstance = $modal.open({
                templateUrl: 'artistDetails.html',
                controller: "ArtistModalController",
                resolve: {
                    favArtist: function () {
                        return favArtist;
                    }
                }
            });
        });
    }

    $scope.viewTrackData = function (track) {
        var favTrack = null;
        UpbeatService.searchTrackById(track.id, function (response) {
            favTrack = response;
            var modalInstance = $modal.open({
                templateUrl: 'trackDetails.html',
                controller: "TrackModalController",
                resolve: {
                    favTrack: function () {
                        return favTrack;
                    }
                }
            });
        });
    }

    $scope.viewAlbumData = function (album) {
        var favAlbum = null;
        UpbeatService.searchAlbumById(album.id, function (response) {
            favAlbum = response;
            var modalInstance = $modal.open({
                templateUrl: 'albumDetails.html',
                controller: "AlbumModalController",
                resolve: {
                    favAlbum: function () {
                        return favAlbum;
                    }
                }
            });
        });
    }

});

app.controller("ArtistModalController", function ($scope, $http, $rootScope, UpbeatService, $modalInstance, favArtist) {
    $scope.favArtist = favArtist;
    console.log(favArtist);
    $scope.ok = function () {
        $modalInstance.close("Close");
    };
});

app.controller("AlbumModalController", function ($scope, $http, $rootScope, UpbeatService, $modalInstance, favAlbum) {
    $scope.favAlbum = favAlbum;
    console.log(favAlbum);
    $scope.ok = function () {
        $modalInstance.close("Close");
    };
});

app.controller("TrackModalController", function ($scope, $http, $rootScope, UpbeatService, $modalInstance, favTrack) {
    $scope.favTrack = favTrack;
    console.log(favTrack);
    $scope.ok = function () {
        $modalInstance.close("Close");
    };
});

app.controller("NavController", function ($scope, $http, $rootScope, UpbeatService) {
    $scope.currentUser = null;
    $scope.login = function () {
        $http.post("/api/login", $scope.user)
         .success(function (response) {
             $rootScope.currentUser = response;
             $scope.currentUser = response;
         })
         .error(function (response) {
             console.log("username or password is incorrect");
             alert("username or password is incorrect");
             console.log(response);
         });
    }

    $scope.logout = function () {
        $http.post("/api/logout");
        $scope.currentUser = null;
        $scope.user = null;
    }
});