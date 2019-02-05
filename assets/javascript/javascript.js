var apiKeyYouTube = 'AIzaSyDK_1yPwKvCaESvpbb720lhlXhWOgA7TZA';
var apiKeyYouTube2 = 'AIzaSyDqxSqqaRusfJAst31QLaECEm9N3wUjVCA';
var apiKeyYouTube3 = 'AIzaSyCJdvoiiHXj_gTPs4znRcg0fNg1dxterqo';
var f2fapiKey = "efaba70a5fdb8ae09da79304b664e07c";
var f2fapiKey2 = "b2189fb78a14525d96d74258664ac4de";
var aaronApiKey = "7cceeb4b2220e0c81e6507314de65e35";
var sarahApiKey = 'ad1b03143bacf457e6cc624753f58408';
var queryURL = "https://www.food2fork.com/api/search?key=" + f2fapiKey2 + "&q=";
var f2f;
var ranNums = [];
let num, already = new Object;
let start = 0,
    end = 30;

$(function () {
    $('#search-form').submit(function (e) {
        e.preventDefault();
        $('#results').empty();
        $('#text-dump').empty();
        for (let i = 0; i < 6;) {
            num = (Math.random() * (end - start) + start) ^ 0;
            if (!(num in already)) {
                already[num] = num;
                i++;
                ranNums.push(String(num));
                if (i < 25);
            }
        }
    });
});

function search(a) {
    if ($('#query').val() === '') {
        return false;
    } else {
        return runCode();
    }
    ranNums = [];
};

function runCode() {
    q = $('#query').val();
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            channelId: 'UCJFp8uSYCjXOMnkUyb3CQ3Q',
            maxResults: '6',
            key: apiKeyYouTube2
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
            for (var i = 0; i < 7; i++) {
                var cardDiv = $('<div>');
                var output2 = getOutput2(response, i);
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
    var ctitle = title.replace(/\s/g, "_");

    var output = '<li>' +
        '<div class="list-left"><div id="video" class="favvideo" rel="' + videoID + ',' + thumb + ',' + videoDate + ',' + ctitle + '"></div>' +
        '<img src="' + thumb + '">' +
        '</div>' +
        '<div class="list-right">' +
        '<h3><a data-fancybox-type="iframe" target="_blank" class="fancyboxIframe" href="https://youtube.com/embed/' + videoID + '?rel=0">' + title + '</a></h3>' +
        '<small>By <span class="cTitle">' + channelTitle + '</small>' +
        '<p>' + description + '</p>' +
        '</div>' +
        '</li>' +
        '<div class="clearfix"></div>' +
        '';
    return output;
}


function getOutput2(response, i) {
    var recipeImg = response.recipes[ranNums[i]].image_url;
    var recipeTitle = response.recipes[ranNums[i]].title;
    var recipeURL = response.recipes[ranNums[i]].source_url;
    f2f = response.recipes[ranNums[i]].f2f_url;
    $(this).css("display", "block");
    var title = recipeTitle.replace(/\s/g, "_");

    var output2 = $("<div class='product'>").html('<div class="fav" id="bn" rel ="' + f2f + ',' + recipeImg + ',' + recipeURL + ',' + title + '"></div><img src="' + recipeImg + '" class="card-img-top"' +
        ' alt="..."><div class="card-body" style="border: 1px solid lightgray;">' +
        '<h5 class="card-title">' + recipeTitle + '</h5>' +
        '<a href="' + recipeURL + '" target="_blank" class="btn btn-primary">directions</a>'
    );
    return output2;
};

$('body').on("click", "#video", function () {
    var a = $(this).attr("rel");
    $(this).removeClass("favvideo");
    $(this).addClass("favdel");
    $(this).removeAttr('id');
    var res = a.split(",");
    var vid1 = localStorage.getItem('vid1');
    var vid2 = localStorage.getItem('vid2');
    var vid3 = localStorage.getItem('vid3');
    var vid4 = localStorage.getItem('vid4');
    var vid5 = localStorage.getItem('vid5');
    var vid6 = localStorage.getItem('vid6');
    if (vid1 == null) {
        localStorage.setItem('vid1', JSON.stringify(res));
    } else if (vid2 == null) {
        localStorage.setItem('vid2', JSON.stringify(res));
    } else if (vid3 == null) {
        localStorage.setItem('vid3', JSON.stringify(res));
    } else if (vid4 == null) {
        localStorage.setItem('vid4', JSON.stringify(res));
    } else if (vid5 == null) {
        localStorage.setItem('vid5', JSON.stringify(res));
    } else if (vid6 == null) {
        localStorage.setItem('vid6', JSON.stringify(res));
    } else {
        localStorage.setItem('vid7', JSON.stringify(res));
    }
    res = null;
});



var vid1 = localStorage.getItem('vid1');
var vid2 = localStorage.getItem('vid2');
var vid3 = localStorage.getItem('vid3');
var vid4 = localStorage.getItem('vid4');
var vid5 = localStorage.getItem('vid5');
var vid6 = localStorage.getItem('vid6');
var vid7 = localStorage.getItem('vid7');

if (vid1 != null) {
    var item = vid1.split(",");
    var obj = JSON.parse(item);
    var tit = obj[3];
    var title = tit.replace(/[^a-zA-Z ]/g, " ");
    $("#video").append('<div class="product">' +
        '<div class="favdel" onclick=deleterec("vid1")><img src="assets/images/trashcan.png"></div>' +
        '<a href="https://youtube.com/embed/' + obj[0] + '" target="_blank"><img src=' + obj[1] + ' class="card-img-top" alt="..."></a>' +
        '<div class="card-body" style="border: 1px solid lightgray;"><h5 class="card-title"><a href="https://youtube.com/embed/' + obj[0] + '" target="_blank">' + title + '</a></h5>' +
        '</div></div>');
}


if (vid2 != null) {
    var item = vid2.split(",");
    var obj2 = JSON.parse(item);
    var tit = obj2[3];
    var title = tit.replace(/[^a-zA-Z ]/g, " ");
    $("#video").append('<div class="product">' +
        '<div class="favdel" onclick=deleterec("vid2")><img src="assets/images/trashcan.png"></div>' +
        '<a href="https://youtube.com/embed/' + obj2[0] + '" target="_blank"><img src=' + obj2[1] + ' class="card-img-top" alt="..."></a>' +
        '<div class="card-body" style="border: 1px solid lightgray;"><h5 class="card-title"><a href="https://youtube.com/embed/' + obj2[0] + '" target="_blank">' + title + '</a></h5>' +
        '</div></div>');
}


if (vid3 != null) {
    var item = vid3.split(",");
    var obj3 = JSON.parse(item);
    var tit = obj3[3];
    var title = tit.replace(/[^a-zA-Z ]/g, " ");
    $("#video").append('<div class="product">' +
        '<div class="favdel" onclick=deleterec("vid3")><img src="assets/images/trashcan.png"></div>' +
        '<a href="https://youtube.com/embed/' + obj3[0] + '" target="_blank"><img src=' + obj3[1] + ' class="card-img-top" alt="..."></a>' +
        '<div class="card-body" style="border: 1px solid lightgray;"><h5 class="card-title"><a href="https://youtube.com/embed/' + obj3[0] + '" target="_blank">' + title + '</a></h5>' +
        '</div></div>');
}


if (vid4 != null) {
    var item = vid4.split(",");
    var obj4 = JSON.parse(item);
    var tit = obj4[3];
    var title = tit.replace(/[^a-zA-Z ]/g, " ");
    $("#video").append('<div class="product">' +
        '<div class="favdel" onclick=deleterec("vid4")><img src="assets/images/trashcan.png"></div>' +
        '<a href="https://youtube.com/embed/' + obj4[0] + '" target="_blank"><img src=' + obj4[1] + ' class="card-img-top" alt="..."></a>' +
        '<div class="card-body" style="border: 1px solid lightgray;"><h5 class="card-title"><a href="https://youtube.com/embed/' + obj4[0] + '" target="_blank">' + title + '</a></h5>' +
        '</div></div>');
}


if (vid5 != null) {
    var item = vid5.split(",");
    var obj5 = JSON.parse(item);
    var tit = obj5[3];
    var title = tit.replace(/[^a-zA-Z ]/g, " ");
    $("#video").append('<div class="product">' +
        '<div class="favdel" onclick=deleterec("vid5")><img src="assets/images/trashcan.png"></div>' +
        '<a href="https://youtube.com/embed/' + obj5[0] + '" target="_blank"><img src=' + obj5[1] + ' class="card-img-top" alt="..."></a>' +
        '<div class="card-body" style="border: 1px solid lightgray;"><h5 class="card-title"><a href="https://youtube.com/embed/' + obj5[0] + '" target="_blank">' + title + '</a></h5>' +
        '</div></div>');
}

if (vid6 != null) {
    var item = vid6.split(",");
    var obj6 = JSON.parse(item);
    var tit = obj6[3];
    var title = tit.replace(/[^a-zA-Z ]/g, " ");
    $("#video").append('<div class="product">' +
        '<div class="favdel" onclick=deleterec("vid6")><img src="assets/images/trashcan.png"></div>' +
        '<a href="https://youtube.com/embed/' + obj6[0] + '" target="_blank"><img src=' + obj6[1] + ' class="card-img-top" alt="..."></a>' +
        '<div class="card-body" style="border: 1px solid lightgray;"><h5 class="card-title"><a href="https://youtube.com/embed/' + obj6[0] + '" target="_blank">' + title + '</a></h5>' +
        '</div></div>');
}

if (vid7 != null) {
    var item = vid7.split(",");
    var obj7 = JSON.parse(item);
    var tit = obj7[3];
    var title = tit.replace(/[^a-zA-Z ]/g, " ");
    $("#video").append('<div class="product">' +
        '<div class="favdel" onclick=deleterec("vid7")><img src="assets/images/trashcan.png"></div>' +
        '<a href="https://youtube.com/embed/' + obj7[0] + '" target="_blank"><img src=' + obj7[1] + ' class="card-img-top" alt="..."></a>' +
        '<div class="card-body" style="border: 1px solid lightgray;"><h5 class="card-title"><a href="https://youtube.com/embed/' + obj7[0] + '" target="_blank">' + title + '</a></h5>' +
        '</div></div>');
}

$('body').on("click", "#bn", function () {
    var a = $(this).attr("rel");
    $(this).removeClass("fav");
    $(this).addClass("favdel");
    $(this).removeAttr('id');
    var res = a.split(",");
    var prd1 = localStorage.getItem('prd1');
    var prd2 = localStorage.getItem('prd2');
    var prd3 = localStorage.getItem('prd3');
    var prd4 = localStorage.getItem('prd4');
    var prd5 = localStorage.getItem('prd5');
    var prd6 = localStorage.getItem('prd6');
    if (prd1 == null) {
        localStorage.setItem('prd1', JSON.stringify(res));
    } else if (prd2 == null) {
        localStorage.setItem('prd2', JSON.stringify(res));
    } else if (prd3 == null) {
        localStorage.setItem('prd3', JSON.stringify(res));
    } else if (prd4 == null) {
        localStorage.setItem('prd4', JSON.stringify(res));
    } else if (prd5 == null) {
        localStorage.setItem('prd5', JSON.stringify(res));
    } else if (prd6 == null) {
        localStorage.setItem('prd6', JSON.stringify(res));
    } else {
        localStorage.setItem('prd7', JSON.stringify(res));
    }
});

var prd1 = localStorage.getItem('prd1');
var prd2 = localStorage.getItem('prd2');
var prd3 = localStorage.getItem('prd3');
var prd4 = localStorage.getItem('prd4');
var prd5 = localStorage.getItem('prd5');
var prd6 = localStorage.getItem('prd6');
var prd7 = localStorage.getItem('prd7');

if (prd1 != null) {
    var item = prd1.split(",");
    var str = item[3];
    var tit = str.replace(/[^a-zA-Z ]/g, " ")
    $("#item").append('<div class="product">' +
        '<div class="favdel" onclick=deleterec("prd1")><img src="assets/images/trashcan.png"></div>' +
        '<img src=' + item[1] + ' class="card-img-top" alt="...">' +
        '<div class="card-body" style="border: 1px solid lightgray;"><h5 class="card-title">' + tit + '</h5>' +
        '<a href=' + item[2] + ' target="_blank" class="btn btn-primary">Directions</a>' +
        '</div></div>');
}

if (prd2 != null) {
    var item2 = prd2.split(",");
    var str2 = item2[3];
    var tit2 = str2.replace(/[^a-zA-Z ]/g, " ")
    $("#item").append('<div class="product">' +
        '<div class="favdel" onclick=deleterec("prd2")><img src="assets/images/trashcan.png"></div>' +
        '<img src=' + item2[1] + ' class="card-img-top" alt="...">' +
        '<div class="card-body" style="border: 1px solid lightgray;"><h5 class="card-title">' + tit2 + '</h5>' +
        '<a href=' + item2[2] + ' target="_blank" class="btn btn-primary">Directions</a>' +
        '</div></div>');
}

if (prd3 != null) {
    var item3 = prd3.split(",");
    var str3 = item3[3];
    var tit3 = str3.replace(/[^a-zA-Z ]/g, " ")
    $("#item").append('<div class="product">' +
        '<div class="favdel" onclick=deleterec("prd3")><img src="assets/images/trashcan.png"></div>' +
        '<img src=' + item3[1] + ' class="card-img-top" alt="...">' +
        '<div class="card-body" style="border: 1px solid lightgray;"><h5 class="card-title">' + tit3 + '</h5>' +
        '<a href=' + item3[2] + ' target="_blank" class="btn btn-primary">Directions</a>' +
        '</div></div>');
}

if (prd4 != null) {
    var item4 = prd4.split(",");
    var str4 = item4[3];
    var tit4 = str4.replace(/[^a-zA-Z ]/g, " ")
    $("#item").append('<div class="product">' +
        '<div class="favdel" onclick=deleterec("prd4")><img src="assets/images/trashcan.png"></div>' +
        '<img src=' + item4[1] + ' class="card-img-top" alt="...">' +
        '<div class="card-body" style="border: 1px solid lightgray;"><h5 class="card-title">' + tit4 + '</h5>' +
        '<a href=' + item4[2] + ' target="_blank" class="btn btn-primary">Directions</a>' +
        '</div></div>');
}

if (prd5 != null) {
    var item5 = prd5.split(",");
    var str5 = item5[3];
    var tit5 = str5.replace(/[^a-zA-Z ]/g, " ")
    $("#item").append('<div class="product">' +
        '<div class="favdel" onclick=deleterec("prd5")><img src="assets/images/trashcan.png"></div>' +
        '<img src=' + item5[1] + ' class="card-img-top" alt="...">' +
        '<div class="card-body" style="border: 1px solid lightgray;"><h5 class="card-title">' + tit5 + '</h5>' +
        '<a href=' + item5[2] + ' target="_blank" class="btn btn-primary">Directions</a>' +
        '</div></div>');
}

if (prd6 != null) {
    var item6 = prd6.split(",");
    var str6 = item6[3];
    var tit6 = str6.replace(/[^a-zA-Z ]/g, " ")
    $("#item").append('<div class="product">' +
        '<div class="favdel" onclick=deleterec("prd6")><img src="assets/images/trashcan.png"></div>' +
        '<img src=' + item6[1] + ' class="card-img-top" alt="...">' +
        '<div class="card-body" style="border: 1px solid lightgray;"><h5 class="card-title">' + tit6 + '</h5>' +
        '<a href=' + item6[2] + ' target="_blank" class="btn btn-primary">Directions</a>' +
        '</div></div>');
}

if (prd7 != null) {
    var item7 = prd7.split(",");
    var str7 = item7[3];
    var tit7 = str7.replace(/[^a-zA-Z ]/g, " ")
    $("#item").append('<div class="product">' +
        '<div class="favdel" onclick=deleterec("prd7")><img src="assets/images/trashcan.png"></div>' +
        '<img src=' + item7[1] + ' class="card-img-top" alt="...">' +
        '<div class="card-body" style="border: 1px solid lightgray;"><h5 class="card-title">' + tit7 + '</h5>' +
        '<a href=' + item7[2] + ' target="_blank" class="btn btn-primary">Directions</a>' +
        '</div></div>');
}

function deleterec(a) {
    localStorage.removeItem(a);
    location.reload();
}