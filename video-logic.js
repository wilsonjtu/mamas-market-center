window.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('video');
    var streamUrl = 'https://www.bloomberg.com/media-manifest/streams/phoenix-us.m3u8';

    setTimeout(function() {
        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(streamUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play().catch(e => console.log("Autoplay blocked, waiting for user."));
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = streamUrl;
            video.addEventListener('canplay', function() {
                video.play();
            });
        }
    }, 1000);
});
