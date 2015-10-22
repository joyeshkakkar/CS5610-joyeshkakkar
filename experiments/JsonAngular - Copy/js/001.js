$(function () {
    $("#getMovie").click(function () {
        var movieTitle=$("#movieTitle").val();    
        $.ajax({
            url: "https://api.spotify.com/v1/search?q=" + movieTitle + "&type=track&limit=1",
            dataType: "json",
            success: renderMovies
        });
    })
});
function renderMovies(movies) {
    console.log(movies);
    alert(movies);
    
    var movie = movies.tracks.items[0];
    var name = movie.name;
    var artists = movie.artists;
    var images = movie.album.images;
    var h4 = $("<h4>")
        .append(name);
    var p= $("<p>")
        .append(artists[0].name).append("</hr>");
    var img=$("<img>")
        .attr("src", images[0].url);
    $(".content").empty().append(h4).append(p).append(img);
}
