app.controller("PlaylistController", function ($scope, $http, $rootScope, PlaylistService, UserService, FollowerService) {
    var currentUser = $rootScope.currentUser;
    $scope.currentUser = currentUser;
    $scope.isCollapsed = true;     
    console.log(currentUser);

    if ($rootScope.currentUser != null) {
        var userId = currentUser._id;
        UserService.searchUserByUserId(userId, function (response) {
            $rootScope.currentUser = response;
            $scope.currentUser = response;
            console.log(response);
        });

        PlaylistService.searchPlaylistByUserId(userId, function (response) {
            console.log(response);
            $scope.ownPlaylists = response;
        });

        PlaylistService.searchPlaylistExcludingAUserId(userId, function (response) {
            $scope.publishedPlaylists = response;
            console.log(response);
        });

        FollowerService.followedPlaylist(userId, function (response) {
            console.log(response);
            $scope.followedPlaylists = response;
        });
    }

    $scope.deletePlaylist = function (playlist) {
        var currentUser = $rootScope.currentUser;
        var userId = currentUser._id;
        PlaylistService.deletePlaylist(playlist, function (response) {
            console.log(response);
            PlaylistService.searchPlaylistByUserId(userId, function (response) {
                $scope.ownPlaylists = response;
                console.log(response);
            });
        });
    }
       
    /*To add a new playlist*/
    $scope.savePlaylist = function () {
        var currentUser = $rootScope.currentUser;
        console.log(currentUser);
        var playlist = { name: $scope.playlistName, userId: currentUser._id };
        PlaylistService.savePlaylist(playlist, function (response) {
            PlaylistService.searchPlaylistByUserId(userId, function (response) {
                $scope.ownPlaylists = response;
            });
            $scope.isCollapsed = true;
            $scope.playlistName = null;
        });
    }

    $scope.followPlaylist = function (publishedPlaylist) {
        var currentUser = $rootScope.currentUser;
        console.log(currentUser);
        var follower = { playlistId: publishedPlaylist._id, followerUserId: currentUser._id };
        FollowerService.followPlaylist(follower, function (response) {
            console.log(response);
            PlaylistService.searchPlaylistExcludingAUserId(userId, function (response) {
                $scope.publishedPlaylists = response;
                console.log(response);
            });
            FollowerService.followedPlaylist(userId, function (response) {
                console.log(response);
                $scope.followedPlaylists = response;
            });
            $scope.isCollapsed = true;
            $scope.playlistName = null;
        });
    }

    $scope.unfollowPlaylist = function (followedPlaylist) {
        var currentUser = $rootScope.currentUser;
        console.log(currentUser);
        console.log(followedPlaylist);
        var follower = { playlistId: followedPlaylist._id, followerUserId: currentUser._id };
        console.log(follower);
        FollowerService.unfollowPlaylist(follower, function (response) {
            console.log(response);
            FollowerService.followedPlaylist(userId, function (response) {
                console.log(response);
                $scope.followedPlaylists = response;
            });
            PlaylistService.searchPlaylistExcludingAUserId(userId, function (response) {
                $scope.publishedPlaylists = response;
                console.log(response);
            });
            $scope.isCollapsed = true;
            $scope.playlistName = null;
        });
    }

    $scope.publishPlaylist = function (playlist) {
        console.log(playlist);
        var playlist =  { _id: playlist._id, name: playlist.name, tracks: playlist.tracks, publish: true, userId: playlist.userId, addedOn: playlist.addedOn};
        PlaylistService.publishUnpublishPlaylist(playlist, function (response) {
            console.log(response);
            PlaylistService.searchPlaylistByUserId(userId, function (response) {
                $scope.ownPlaylists = response;
                console.log(response);
            })
            $scope.isCollapsed = true;
            $scope.playlistName = null;
        });
    }

    $scope.unpublishPlaylist = function (playlist) {
        var playlist = { _id: playlist._id, name: playlist.name, tracks: playlist.tracks, publish: false, userId: playlist.userId, addedOn: playlist.addedOn };
        PlaylistService.publishUnpublishPlaylist(playlist, function (response) {
            console.log(response);
            PlaylistService.searchPlaylistByUserId(userId, function (response) {
                $scope.ownPlaylists = response;
                console.log(response);
            })
            $scope.isCollapsed = true;
            $scope.playlistName = null;
        });
    }

    $scope.removeTrackFromPlaylist = function (track, playlist) {
        console.log(track);
        console.log(playlist);
        var index = playlist.tracks.indexOf(track);
        playlist.tracks.splice(index, 1);
        PlaylistService.updatePlaylistWithTrack(playlist, function (response) {
            console.log(response);
            $scope.playlist = response;
            $scope.playlistUpdated = true;
        });
    }

    $scope.cancel = function () {
        $scope.isCollapsed = true;
        $scope.playlistName = null;
    }

    $scope.show = function () {
        $scope.isCollapsed = false;
    }

});