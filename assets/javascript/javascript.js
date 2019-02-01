var apiKeyYouTube = 'AIzaSyDK_1yPwKvCaESvpbb720lhlXhWOgA7TZA';
var apiKey = "efaba70a5fdb8ae09da79304b664e07c";
var apiKey2 = "3e41e73b5dc6d9814f11a41367eba21e";
var aaronApiKey = "7cceeb4b2220e0c81e6507314de65e35";
var sarahApiKey = 'ad1b03143bacf457e6cc624753f58408';
var recipeSearch = $("#query").val().trim();
var queryURL = "https://www.food2fork.com/api/search?key=" + apiKey2 + "&q=" + recipeSearch;

$(function () {
    $('#search-form').submit(function (e) {
        e.preventDefault();
    });
});

function search() {
    q = $('#query').val();

    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            key: apiKeyYouTube
        },
        function (data) {
            $.each(data.items, function (i, item) {
                var output = getOutput(item);
                $('#results').prepend(output);
            });
        });

    $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json"
        })
        .then(function (response) {
            var randomResult = Math.floor(Math.random() * 29);
            console.log(randomResult)
            $(".card-img-top").attr("src", response.recipes[randomResult].image_url);
            $(".card-title").text(response.recipes[randomResult].title);
            $(".btn.btn-primary").attr("href", response.recipes[randomResult].source_url);
        })
}

function getOutput(item) {
    var videoID = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    var output = '<li>' +
        '<div class="list-left">' +
        '<img src="' + thumb + '">' +
        '</div>' +
        '<div class="list-right">' +
        '<h3><a data-fancybox-type="iframe" class="fancyboxIframe" href="https://youtube.com/embed/' + videoID + '?rel=0">' + title + '</a></h3>' +
        '<small>By <span class="cTitle">' + channelTitle + '</span> on ' + videoDate + '</small>' +
        '<p>' + description + '</p>' +
        '</div>' +
        '</li>' +
        '<div class="clearfix"></div>' +
        '';
    return output;

}

var card = $("<div>").html('<img src="..." class="card-img-top"' +
    ' alt="..."><div class="card-body" style="border: 1px solid lightgray;">' +
    `<h5 class="card-title"></h5>` +
    '<a href="#" target="_blank" class="btn btn-primary">Directions</a>'
)

var card2 = $("<div>").html('<img src="..." class="card-img-top"' +
    ' alt="..."><div class="card-body" style="border: 1px solid lightgray;">' +
    `<h5 class="card-title"></h5>` +
    '<a href="#" target="_blank" class="btn btn-primary">Directions</a>'
)

$('#card1').append(card);
$('#card2').append(card2);