// name of the gdp song to play by default
var defaultSongName = 'singalong';
// initialize the javascript Audio object
var gdpAudio = new Audio();
gdpAudio.src = getAudioUrl(defaultSongName);

// get the url for the audio from the gdp website
function getAudioUrl(songName) {
    return 'http://gifdanceparty.giphy.com/music/' + songName + '.ogg';
}

// listen for events from the gdp content script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // incoming message to play a particular song
        if (request.type === "songName") {
            gdpAudio.src = getAudioUrl(request.songName);
            gdpAudio.loop = true;
            gdpAudio.play();
        // incoming message to stop audio, aka STOP THE PARTY
        } else if (request.type === "stopAudio") {
            gdpAudio.pause();
            gdpAudio.currentTime = 0;
            gdpAudio.src = getAudioUrl(defaultSongName);
        }
    }
)
