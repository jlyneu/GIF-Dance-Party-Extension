// name of the gdp song to play by default
var defaultSongName = 'singalong';
// initialize the javascript Audio object
var gdpAudio = new Audio();
gdpAudio.src = getAudioUrl(defaultSongName);

var triggered = false; //variable to store whether weve started the party

// get the url for the audio from the gdp website
function getAudioUrl(songName) {
    return 'http://gifdanceparty.giphy.com/music/' + songName + '.ogg';
}

//listen for clicks to the icon
chrome.browserAction.onClicked.addListener(function (){
    //keep state to toggle
    if(triggered == false){
        //get selected tab
        chrome.tabs.getSelected(null, function(tab) {
            //send tab user script a message 
            chrome.tabs.sendMessage(tab.id, {type: "startParty"});
            triggered = true;
        });
    }
    else{
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendMessage(tab.id, {type: "stopParty"});
            triggered = false;
        });
    }
});

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
