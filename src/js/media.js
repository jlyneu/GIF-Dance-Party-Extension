/**
 * Contains variables and functions used to retrieve images, GIFs, and music
 * for the GIF Dance Party
 */
gdpMedia =  {
    /* List of GIF Dance Party song titles */
    gdpPlaylist: [
        'bazz', 'bubblebutt', 'fatboy', 'grounded',
        'halffull', 'nahnahnah', 'singalong', 'trololo',
        'twist', 'walkmen', 'wegotyou'
    ],
    /* Mapping from dancer names to Giphy ids for dancer GIFs */
    giphyIds: {
        carlton: 'wn8rVP7qC8TNC',
        pumpGirl: '26BkNiQlYeHc5jpf2'
    },
    /* Mapping from dancer names to Imgur ids for dancer thumbnails */
    imgurIds: {
        '8bitcarlton': 'ifuoPqn',
        apple: 'wbv3RCd',
        arnold: 'Sh6WPJs',
        babe: 'hDWrKI7',
        banana: 'Li3pOWH',
        bananabounce: 'Ky3jiGQ',
        bear: '7KW1zWk',
        blob: 'P7meKeB',
        bmo: 'Q6Jyks5',
        bonebreak: 'otdi7m9',
        bones: 'WEl9Npv',
        breakglitch: 'TXYwR2F',
        brian: 'mcVtWQT',
        bunny: 'OPfS7wP',
        bunnyspank: 'G9Bs0N9',
        business: 'QaSTmdL',
        cact: 'fn0xLOv',
        carlton: 'uF179oM',
        charlie: 'aXXDfwI',
        chicken: 'Uckh2i8',
        cowboy: 'sCxQ7om',
        discoball: 'FqqZgIZ',
        doggy: 'Q6r1gYp',
        elvenbooty: '1GZgAQV',
        fabio: '320x7kR',
        fatspidey: '5GZYEmt',
        foreveralone: 'jgOvt9T',
        fred: 'FSvV7is',
        fuzzball: 'ehDJ5bp',
        gene: 'nfO1s5a'
    },
    /* List of GIF Dance Party dancer names */
    dancerNameList: [
        '8bitcarlton', 'apple', 'arnold', 'babe',
        'banana', 'bananabounce', 'bear', 'blob',
        'bmo', 'bonebreak', 'bones', 'breakglitch',
        'brian', 'bunny', 'bunnyspank', 'business',
        'cact', 'carlton', 'charlie', 'chicken',
        'cowboy', 'discoball', 'doggy', 'elvenbooty',
        'fabio', 'fatspidey', 'foreveralone', 'fred',
        'fuzzball', 'gene', 'ghosty', 'girlstep',
        'glitchtwist', 'greenlady', 'greenlady2', 'greything',
        'headspin', 'hellicopter', 'hipdog', 'hotdogs',
        'hula', 'humpery', 'jason', 'kirby',
        'kitty', 'lilguy', 'maranda', 'matrix',
        'mj', 'momdance', 'morpher', 'nerd',
        'noshorts', 'nudeflames', 'obama', 'orangeguy',
        'pa', 'patrick', 'pedopickle', 'pilboy',
        'pixelly', 'pizza', 'ponyshuffle', 'possum',
        'pretzel', 'psych', 'pumpgirl', 'ravecat',
        'robothump', 'roger', 'runningworm', 'saxguy',
        'scorpion', 'shawty', 'slappy', 'smooch',
        'speakerhead', 'spinglitch', 'spongeybob', 'squidword',
        'stripper1', 'stripper2', 'tej', 'thehop',
        'thewizard', 'theworm', 'tim', 'twerk',
        'twerk2', 'whiteguy', 'wormlady', 'yeti'
    ],
    /* Retrieve the Imgur url for the given dancer's thumbnail image */
    getThumbnailUrl: function(dancerName) {
        return "https://imgur.com/" + gdpMedia.imgurIds[dancerName] + ".png";
    },
    /* Retrieve the Giphy url for the given dancer's GIF */
    getGifUrl: function(dancerName) {
        return "https://media.giphy.com/media/" + gdpMedia.giphyIds[dancerName] + "/giphy.gif";
    },
    /* Send a message to the background script to play the song with the
       given name */
    selectSong: function(name) {
        chrome.runtime.sendMessage({
            type: "songName",
            songName: name
        });
    },
    /* Send a message to the background script to stop playing audio */
    stopAudio: function() {
        chrome.runtime.sendMessage({
            type: "stopAudio"
        });
    },
    /* When leaving the current page, send a message to the background script
       to stop playing audio */
    unloadAudio: function() {
        // when leaving the page, be sure to stop the gdp audio
        $(window).unload(function() {
            gdpMedia.stopAudio();
        });
    }
}
