var gapikey = 'AIzaSyDK_1yPwKvCaESvpbb720lhlXhWOgA7TZA';

$(function () {

    var searchField = $('#query');
    var icon = $('#search-btn');

    $('#search-form').submit(function (e) {
        e.preventDefault();
    });
});

function search() {
    // get form input
    q = $('#query').val(); // this probably shouldn't be created as a global

    // run get request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            key: gapikey
        },
        function (data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            // Log data
            console.log(data);

            $.each(data.items, function (i, item) {

                // Get Output
                var output = getOutput(item);

                // display results
                $('#results').append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken);

            // Display buttons
            $('#buttons').append(buttons);
        });
}

// Next page function
function nextPage() {
    var token = $('#next-button').data('token');
    var q = $('#next-button').data('query');


    // clear 
    $('#results').html('');
    $('#buttons').html('');

    // get form input
    q = $('#query').val(); // this probably shouldn't be created as a global

    // run get request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: gapikey
        },
        function (data) {

            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            // Log data
            console.log(data);

            $.each(data.items, function (i, item) {

                // Get Output
                var output = getOutput(item);

                // display results
                $('#results').append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken);

            // Display buttons
            $('#buttons').append(buttons);
        });
}

// Previous page function
function prevPage() {
    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');


    // clear 
    $('#results').html('');
    $('#buttons').html('');

    // get form input
    q = $('#query').val(); // this probably shouldn't be created as a global

    // run get request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: gapikey
        },
        function (data) {

            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            // Log data
            console.log(data);

            $.each(data.items, function (i, item) {

                // Get Output
                var output = getOutput(item);

                // display results
                $('#results').append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken);

            // Display buttons
            $('#buttons').append(buttons);
        });
}

// Build output
function getOutput(item) {
    var videoID = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    // Build output string
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

function getButtons(prevPageToken, nextPageToken) {
    if (!prevPageToken) {
        var btnoutput = '<div class="button-container">' +
            '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' +
            'onclick = "nextPage();">Next Page</button>' +
            '</div>';
    } else {
        var btnoutput = '<div class="button-container">' +
            '<button id="prev-button" class="paging-button" data-token="' + prevPageToken + '" data-query="' + q + '"' +
            'onclick = "prevPage();">Prev Page</button>' +
            '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' +
            'onclick = "nextPage();">Next Page</button>' +
            '</div>';
    }

    return btnoutput;
}