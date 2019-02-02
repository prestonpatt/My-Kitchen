var apiKeyYouTube = 'AIzaSyDK_1yPwKvCaESvpbb720lhlXhWOgA7TZA';

var f2fapiKey = "efaba70a5fdb8ae09da79304b664e07c";
var f2fapiKey2 = "b2189fb78a14525d96d74258664ac4de";
var aaronApiKey = "7cceeb4b2220e0c81e6507314de65e35";
var sarahApiKey = 'ad1b03143bacf457e6cc624753f58408';
var queryURL = "https://www.food2fork.com/api/search?key=" + f2fapiKey2 + "&q=";
var f2f;
$(function () {
    $('#search-form').submit(function (e) {
        e.preventDefault();
        $('#results').empty();
        $('#text-dump').empty();
    });
});

function search(a) {
    if ($('#query').val() === '') {
        return false;
    } else {
        return runCode();
    }
};

function runCode() {
    q = $('#query').val();

    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            channelId: 'UCJFp8uSYCjXOMnkUyb3CQ3Q',
            key: apiKeyYouTube
        },
        function (data) {
            $.each(data.items, function (i, item) {
                var output = getOutput(item);
                $('#results').prepend(output);
            });
        });

    $.ajax({
            url: queryURL + q,
            method: "GET",
            dataType: "json"
        })
        .then(function (response) {
            for (var i = 1; i < 7; i++) {
                var cardDiv = $('<div>');
                var output2 = getOutput2(response);
                cardDiv.addClass('card1');
                cardDiv.append(output2);
                $('#text-dump').append(cardDiv);
            }
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
        '<div class="list-left"><div class="fav" onclick=addtofav("' + videoID + ',' + thumb + ',' + videoDate + '")><img src="assets/images/award-outline.png" /> Add to favourite</div>' +
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



function getOutput2(response) {
    var randomResult = Math.floor(Math.random() * 29);
    var recipeImg = response.recipes[randomResult].image_url;
    var recipeTitle = response.recipes[randomResult].title;
    var recipeURL = response.recipes[randomResult].source_url;
    f2f = response.recipes[randomResult].f2f_url;

    var title = recipeTitle.replace(/\s/g, "_");
    var output2 = $("<div class='product'>").html('<div class="fav" onclick=addtoimg("' + f2f + ',' + recipeImg + ',' + recipeURL + ',' + title + '")><img src="assets/images/award-outline.png" />Add to favorite</div><div class="favdel" id="none"><img src="assets/images/award-filled.png"></div><img src="' + recipeImg + '" class="card-img-top"' +
        ' alt="..."><div class="card-body" style="border: 1px solid lightgray;">' +
        '<h5 class="card-title">' + recipeTitle + '</h5>' +
        '<a href="' + recipeURL + '" target="_blank" class="btn btn-primary">Directions</a>'
    )
    return output2;
};


function addtofav(a) {


    //localStorage.setItem('prod', JSON.stringify(prod));
}

function addtoimg(a) {
    var res = a.split(",");
    var result = localStorage.getItem('res');
    var result2 = localStorage.getItem('res1');
    if (result == null && result2 == null) {
        localStorage.setItem('res', JSON.stringify(res));
    } else if (result != null && result2 == null) {
        localStorage.setItem('res1', JSON.stringify(res));
    } else if (result != null && result2 != null) {
        localStorage.setItem('res2', JSON.stringify(res));
    } else {
        localStorage.setItem('res3', JSON.stringify(res));
    }

    $(".fav").css("display", "none");
    $("#none").css({
        "display": "block",
        "margin-top": "20px",
        "z-index": "1",
        "position": "absolute",
        "background": "#f3f3f3"
    });

}


    var res = localStorage.getItem('res');
    var res1 = localStorage.getItem('res1');
    var res2 = localStorage.getItem('res2');

    if (res != null) {
        var item = res.split(",");
        var str = item[3];
        var tit = str.replace(/[^a-zA-Z ]/g, " ")
        var out = '<div class="product">' +
            '<div class="favdel" onclick=deleterec("res")><img src="assets/images/trashcan.png"></div>' +
            '<img src=' + item[1] + ' class="card-img-top" alt="...">' +
            '<div class="card-body" style="border: 1px solid lightgray;"><h5 class="card-title">' + tit + '</h5>' +
            '<a href=' + item[2] + ' target="_blank" class="btn btn-primary">Directions</a>' +
            '</div></div>';
        document.getElementById('item').innerHTML = out;
    }


    if (res1 != null) {
        var item2 = res1.split(",");
        var str2 = item2[3];
        var tit2 = str2.replace(/[^a-zA-Z ]/g, " ")
        var out = '<div class="product">' +
            '<div class="favdel" onclick=deleterec("res1")><img src="assets/images/trashcan.png"></div>' +
            '<img src=' + item2[1] + ' class="card-img-top" alt="...">' +
            '<div class="card-body" style="border: 1px solid lightgray;"><h5 class="card-title">' + tit2 + '</h5>' +
            '<a href=' + item2[2] + ' target="_blank" class="btn btn-primary">Directions</a>' +
            '</div></div>';
        document.getElementById('item2').innerHTML = out;
    }

    if (res2 != null) {
        var item3 = res2.split(",");
        var str3 = item3[3];
        var tit3 = str3.replace(/[^a-zA-Z ]/g, " ")
        var out = '<div class="product">' +
            '<div class="favdel" onclick=deleterec("res2")><img src="assets/images/trashcan.png"></div>' +
            '<img src=' + item3[1] + ' class="card-img-top" alt="...">' +
            '<div class="card-body" style="border: 1px solid lightgray;"><h5 class="card-title">' + tit3 + '</h5>' +
            '<a href=' + item3[2] + ' target="_blank" class="btn btn-primary">Directions</a>' +
            '</div></div>';
        document.getElementById('item3').innerHTML = out;
    }
    if (res3 != null) {
        var item4 = res3.split(",");
        var str4 = item4[3];
        var tit4 = str4.replace(/[^a-zA-Z ]/g, " ")
        var out = '<div class="product">' +
            '<div class="favdel" onclick=deleterec("res2")><img src="assets/images/trashcan.png"></div>' +
            '<img src=' + item4[1] + ' class="card-img-top" alt="...">' +
            '<div class="card-body" style="border: 1px solid lightgray;"><h5 class="card-title">' + tit4 + '</h5>' +
            '<a href=' + item4[2] + ' target="_blank" class="btn btn-primary">Directions</a>' +
            '</div></div>';
        document.getElementById('item').innerHTML = out;
    }



function deleterec(a) {
    localStorage.removeItem(a);
    location.reload();
}