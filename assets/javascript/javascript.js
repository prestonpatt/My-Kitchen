$("#add-recipe-btn").on("click", function (event) {
    event.preventDefault();
    tag = document.createElement('script');
    var recipeInput = $('#recipe-name-input').val().trim();
    console.log(recipeInput);
    tag.src = "https://www.youtube.com/results?search_query=" + recipeInput + "%20recipe";
    console.log(tag.src);
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '300',
            width: '500',
            videoId: '',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    var done = false;

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo);
            done = true;
        }
    }

    function stopVideo() {
        player.stopVideo();
    }
});