/**
 * Contains variables and functions used to retrieve images, GIFs, and music
 * for the GIF Dance Party
 */
gdpMedia =  {
    /* List of GIF Dance Party song titles */
    gdpPlaylist: [
        'no music', 'bazz', 'bubblebutt', 'fatboy', 'grounded',
        'halffull', 'hotline bling', 'nahnahnah', 'singalong', 'trololo',
        'twist', 'walkmen', 'wegotyou', 'sandstorm', 'whats going on'
    ],
    gdpSongMap:{
        'no music': 'nomusic',
        'bazz': 'http://gifdanceparty.giphy.com/music/bazz.ogg',
        'bubblebutt': 'http://gifdanceparty.giphy.com/music/bubblebutt.ogg',
        'fatboy': 'http://gifdanceparty.giphy.com/music/fatboy.ogg',
        'grounded': 'http://gifdanceparty.giphy.com/music/grounded.ogg',
        'halffull': 'http://gifdanceparty.giphy.com/music/halffull.ogg',
        'nahnahnah': 'http://gifdanceparty.giphy.com/music/nahnahnah.ogg',
        'singalong': 'http://gifdanceparty.giphy.com/music/singalong.ogg',
        'trololo': 'http://gifdanceparty.giphy.com/music/trololo.ogg',
        'twist': 'http://gifdanceparty.giphy.com/music/twist.ogg',
        'walkmen': 'http://gifdanceparty.giphy.com/music/walkmen.ogg',
        'wegotyou': 'http://gifdanceparty.giphy.com/music/wegotyou.ogg',
        'hotline bling': 'http://jlyneu.github.io/GIF-Dance-Party-Extension/hotlineloop.wav',
        'sandstorm': 'http://jlyneu.github.io/GIF-Dance-Party-Extension/sandstorm.wav',
        'whats going on': 'http://jlyneu.github.io/GIF-Dance-Party-Extension/heman.wav'
    },
    /* Mapping from dancer names to Imgur thumbnail and Giphy dancer ids */
    mediaIds: {
        '8bitcarlton': {
            imgur: 'ifuoPqn',
            giphy: '3oEduOy5DYLEzDoxb2'
        },
        apple: {
            imgur: 'wbv3RCd',
            giphy: 'l41lQrLqxsH1EIuIw'
        },
        arnold: {
            imgur: 'Sh6WPJs',
            giphy: '3oEduW2sRvdCJjomZi'
        },
        babe: {
            imgur: 'hDWrKI7',
            giphy: 'l41lUxdQ1uRoQfC5G'
        },
        banana: {
            imgur: 'Li3pOWH',
            giphy: '3oEduNh73pM45xDSNi'
        },
        bananabounce: {
            imgur: 'Ky3jiGQ',
            giphy: '3oEdv13hKEjxNrEnU4'
        },
        bear: {
            imgur: '7KW1zWk',
            giphy: '3oEduP15LEqQfXJCNy'
        },
        blob: {
            imgur: 'P7meKeB',
            giphy: 'l41lOD9cTj6YbmcX6'
        },
        bmo: {
            imgur: 'Q6Jyks5',
            giphy: '3oEduYm2dxZpkCCkOA'
        },
        bonebreak: {
            imgur: 'otdi7m9',
            giphy: '3oEduIiEL5hcetXqAE'
        },
        bones: {
            imgur: 'WEl9Npv',
            giphy: 'l41lPlDTLS8NdfVRe'
        },
        brian: {
            imgur: 'mcVtWQT',
            giphy: 'l41lFG8HaIVcPt9QY'
        },
        bunny: {
            imgur: 'OPfS7wP',
            giphy: '3oEdv0KXjUeh27nm80'
        },
        bunnyspank: {
            imgur: 'G9Bs0N9',
            giphy: 'l41lNvJ5gkGf0y4Xm'
        },
        business: {
            imgur: 'QaSTmdL',
            giphy: 'l41lYaZWMVzDdSOA0'
        },
        cact: {
            imgur: 'fn0xLOv',
            giphy: 'l41lYdZg4lDWCYKjK'
        },
        carlton: {
            imgur: 'uF179oM',
            giphy: '3oEduT6H7fftjTic2k'
        },
        charlie: {
            imgur: 'aXXDfwI',
            giphy: '3oEduQkZZDBupCoXU4'
        },
        chicken: {
            imgur: 'Uckh2i8',
            giphy: '3oEdvbJZiqpNdiI5Bm'
        },
        cowboy: {
            imgur: 'sCxQ7om',
            giphy: '3oEduYRB2uyvHWEdJC'
        },
        discoball: {
            imgur: 'FqqZgIZ',
            giphy: 'l41lGAas7QuzXT9UQ'
        },
        doggy: {
            imgur: 'Q6r1gYp',
            giphy: 'l41lIG49uUKFm1sR2'
        },
        drakeHotline: {
            imgur: 'wTATJ1T',
            giphy: '3oEduGBEzAuZHR9jwc'
        },
        drakePush: {
            imgur: '8zy3MQA',
            giphy: '3oEduLLkRxHa9LrwTS'
        },
        drakeWrist: {
            imgur: 'jZUSVbA',
            giphy: 'xTiTnLOTgCWEu3akr6'
        },
        fabio: {
            imgur: '320x7kR',
            giphy: '3oEdvcgt5kA260mpva'
        },
        fatspidey: {
            imgur: '5GZYEmt',
            giphy: '3oEduV5zJRtZA20V32'
        },
        foreveralone: {
            imgur: 'jgOvt9T',
            giphy: 'l41lWaQCC5Y65ErUQ'
        },
        fred: {
            imgur: 'FSvV7is',
            giphy: 'l41lPqa3dpN6ete3m'
        },
        gene: {
            imgur: 'nfO1s5a',
            giphy: '3oEdv6b7ul6xu0qkx2'
        },
        ghosty: {
            imgur: 'VcNCtEa',
            giphy: 'l41lUNDlC1ka19oU8'
        },
        girlstep: {
            imgur: '0oluliM',
            giphy: 'l41lIyJ7mUr60iBkA'
        },
        greenlady: {
            imgur: 't8qX9Q2',
            giphy: 'l41lFr6nvWK6foKXe'
        },
        greenlady2: {
            imgur: '0v0rcxb',
            giphy: '3oEduPQBm9ugmXOupq'
        },
        greything: {
            imgur: 'aFiqpZe',
            giphy: '3oEduOQK29fjTqx4B2'
        },
        headspin: {
            imgur: 'tCmveGx',
            giphy: '26BkLAMkUUe4Kjom4'
        },
        heman: {
            imgur: 'LxPW2rQ',
            giphy: '3o85xEQknNotn5dXfG'
        },
        hipdog: {
            imgur: 'eMs7spK',
            giphy: '3oEdvaWNO2CrIE4fh6'
        },
        hotdogs: {
            imgur: 'g9wUmtR',
            giphy: '3oEduOwP0y4eYwQBNK'
        },
        hula: {
            imgur: 'LoWDE67',
            giphy: '3oEdv8tYhAP5obLpUk'
        },
        humpery: {
            imgur: 'PXplXOH',
            giphy: 'l41lFnwluQ94HmMuY'
        },
        llama: {
            imgur: 'Nj46dlb',
            giphy: 'mGWj9gZG7eFCE'
        },
        jason: {
            imgur: 'YTLTpTk',
            giphy: 'l41lZ65JSCJPni7FS'
        },
        kirby: {
            imgur: 'fOit8Na',
            giphy: 'l41lVDy4QPJJApSPS'
        },
        kitty: {
            imgur: 'IOO2VgN',
            giphy: '3oEduKQuAlKRfgRAvS'
        },
        lilguy: {
            imgur: 'wETEb4l',
            giphy: 'l41lI6dIfDLLMsNjy'
        },
        lisa: {
            imgur: 'hf2s0Ej',
            giphy: 'NfeV16w5ZvaaQ'
        },
        maranda: {
            imgur: 'zZrLAyH',
            giphy: '26BkNCYFWc3YrUSFa'
        },
        matrix: {
            imgur: 'o9uEMoW',
            giphy: '3oEduMJZiPuQIGRkOs'
        },
        mj: {
            imgur: 'U0TcBG6',
            giphy: '3oEdv8uVwchZIxkJDG'
        },
        momdance: {
            imgur: 'M0RSmnl',
            giphy: '3oEduJHTSEBYzpKCd2'
        },
        morpher: {
            imgur: 'vq20Qxj',
            giphy: 'l41lZ1fEGsSIdMK88'
        },
        nerd: {
            imgur: 'S5Wo2T1',
            giphy: 'l41lTnsFgDcDFtiPm'
        },
        noshorts: {
            imgur: 'TEfISD0',
            giphy: '3oEduGtSMcWBJPSDhC'
        },
        obama: {
            imgur: 'lKpfbv1',
            giphy: 'l41lSXRKx8csZ1kic'
        },
        orangeguy: {
            imgur: 'rG0HL2S',
            giphy: '3oEduRSQNa8CTeA3iU'
        },
        pa: {
            imgur: 'wzTfl7Z',
            giphy: 'l41lXHizBwZJWoYLK'
        },
        patrick: {
            imgur: 'CgLMqm8',
            giphy: '3oEdv6ocnBsOlAUQfK'
        },
        pedopickle: {
            imgur: 'jRoMC6Y',
            giphy: 'l41m3WCro5TSN7Bp6'
        },
        pikachu: {
            imgur: '3nnb34A',
            giphy: 'zEBHffYMPaIwM'
        },
        pilboy: {
            imgur: '0iBVON5',
            giphy: '3oEdv3Z6pdRKmTuJY4'
        },
        pixelly: {
            imgur: 'Qw2O47x',
            giphy: '3oEduPmVVIex3w0Oys'
        },
        ponyshuffle: {
            imgur: '6frE5RS',
            giphy: '3oEduTi5ktbhXp3Rm0'
        },
        possum: {
            imgur: 'lFPmQrS',
            giphy: '3oEduKLDMtc7jleGgU'
        },
        pretzel: {
            imgur: 'ffv9231',
            giphy: '3oEdv5NkIKao86MOOY'
        },
        psych: {
            imgur: 'CUnUWId',
            giphy: 'l41m3eRKjt6thCxOw'
        },
        pumpgirl: {
            imgur: 'GD8TggR',
            giphy: 'l41m4R1fgL5jZX1Qc'
        },
        ravecat: {
            imgur: 'KWBLGKg',
            giphy: '3oEduWBjP4utBdgGL6'
        },
        robothump: {
            imgur: 'VZNMx5i',
            giphy: '3oEdv53199cJ6nUhDq'
        },
        roger: {
            imgur: 'JSMQUnh',
            giphy: '3oEdv21WszrucZzBSw'
        },
        runningworm: {
            imgur: '4cDqUCe',
            giphy: '3oEdv2xy5QjqBiSxzO'
        },
        saxguy: {
            imgur: 'E3sRBkX',
            giphy: 'l41lWg4naO0TljUSQ'
        },
        scorpion: {
            imgur: 'dzScRdd',
            giphy: '3oEduNF2afOEDQ4kCY'
        },
        shawty: {
            imgur: 'stZZLVd',
            giphy: '3oEdv0F6sqE5XCWkCc'
        },
        slappy: {
            imgur: 'kzNQ1og',
            giphy: 'l41m35UbftOXLeqD6'
        },
        smooch: {
            imgur: 'BeH7q4x',
            giphy: '3oEduTxikdl6659Tws'
        },
        snoop: {
            imgur: 'u82kPtm',
            giphy: 'O0Xo8Tpk5QxTW'
        },
        speakerhead: {
            imgur: '7Hy7lrN',
            giphy: 'l41lTFERkZe2H9FOo'
        },
        leftshark: {
            imgur: 'glPurdO',
            giphy: '3o85xBH1NjrRfa8kPm'
        },
        spongeybob: {
            imgur: '6AXEklV',
            giphy: '3oEduGmM5MJLjciFSU'
        },
        squidword: {
            imgur: 'v9pzZCM',
            giphy: '26BkMz3mtQqMl6Dw4'
        },
        stripper2: {
            imgur: 'lMp46OR',
            giphy: '3oEduEd9hx2PyRv0pq'
        },
        tej: {
            imgur: 'Q49aPYo',
            giphy: '3oEduF6VoHOTKkrplu'
        },
        thehop: {
            imgur: '5fmPHBc',
            giphy: '3oEduP8lE334O5KNJS'
        },
        thewizard: {
            imgur: 'FExyzq0',
            giphy: '3oEduP15u1e3duOSE8'
        },
        theworm: {
            imgur: 'Z62jSAr',
            giphy: 'l41m6R0OgDvej2Vag'
        },
        tim: {
            imgur: 'hGXXXDl',
            giphy: 'l41lT8zKKiIRjnM1G'
        },
        twerk: {
            imgur: 'EjL0GLT',
            giphy: 'l41lQZJYzSqGDWFz2'
        },
        twerk2: {
            imgur: 'Wrr23n4',
            giphy: 'l41lMNq45znehGNck'
        },
        whiteguy: {
            imgur: '6jYdEPO',
            giphy: '3oEduKmO22VEzbmpLq'
        },
        wormlady: {
            imgur: '8MgJ0S7',
            giphy: '26BkNgV3XffF5vS2Q'
        },
        yeti: {
            imgur: '4LDzQq6',
            giphy: '3oEduYLrzljc1cGY5a'
        }
    },
    /* Retrieve the Imgur url for the given dancer's thumbnail image */
    getThumbnailUrl: function(dancerName) {
        return "https://imgur.com/" + gdpMedia.mediaIds[dancerName]["imgur"] + ".png";
    },
    /* Retrieve the Giphy url for the given dancer's GIF */
    getGifUrl: function(dancerName) {
        return "https://media.giphy.com/media/" + gdpMedia.mediaIds[dancerName]["giphy"] + "/giphy.gif";
    },
    /* Send a message to the background script to play the song with the
       given name */
    selectSong: function(name, isCustom) {
        chrome.runtime.sendMessage({
            type: "songName",
            songName: name,
            isCustom: isCustom,
            songUrl: gdpMedia.gdpSongMap[name]
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
