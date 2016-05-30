var minDimension = 20, maxDimension = 450;
var animations = ['shake', 'wobble', 'tada']

/**
 * Given a collection of jQuery objects, return an array of elements whose
 * height and widths are between the minDimension and maxDimension values
 */
findShakeableElements = function(elements) {
    var shakeableElements = [];
    elements.each(function(index, element) {
        if (element.clientHeight > minDimension &&
                element.clientHeight < maxDimension &&
                element.clientWidth > minDimension &&
                element.clientWidth < maxDimension) {
            shakeableElements.push($(element));
        }
    });
    return shakeableElements;
}

/**
 * Apply a random animate.css class to the given jQuery object element.
 * If a value is passed in for specifiedClass, then use that instead of the
 * random class from the animations array. This parameter is mainly used
 * to always have the first animated element have the same animation each time
 */
animateElement = function(element, specifiedClass) {
    var randomIndex = Math.floor(Math.random() * animations.length);
    element.addClass("gdpAnimated animated infinite " +
        (specifiedClass ? specifiedClass : animations[randomIndex]));
}

/**
 * When gdpHarlemShake.startTheShake is called, start playing the Harlem Shake
 * song. Find an element (ideally one of the dancers) to start shaking during
 * the build up, then have many elements (including the GIF dancers) on the
 * page shake, bounce, etc. during the rest of the song.
 */
gdpHarlemShake = {
    /* is Harlem Shake on for the current browser page? */
    isShaking: false,
    /* DO THE HARLEM SHAKE */
    startTheShake: function() {
        gdpHarlemShake.isShaking = true;

        var currentDancers = $(".gdp-dancer img");
        var shakeableElements = findShakeableElements($('*'));

        /* Start playing the Harlem Shake music */
        gdpMedia.selectSong("", "http://jlyneu.github.io/GIF-Dance-Party-Extension/harlemshake.mp3", true);

        // if there are any dancers, animate one of them for the build up
        if (currentDancers.length > 0) {
            var firstDancer = currentDancers[0];
            animateElement($(firstDancer), 'shake');
            // wait 15 seconds to animate the rest of the GIF dancers
            if (currentDancers.length > 1 && gdpHarlemShake.isShaking) {
                setTimeout(function() {
                    // find any new dancers that were recently added
                    currentDancers = $(".gdp-dancer img");
                    for (var i = 0; i < currentDancers.length; i++) {
                        animateElement($(currentDancers[i]));
                    }
                }, 15 * 1000);
            }
        }
        // otherwise, grab an element on the page and animate it for the build up
        else {
            if (shakeableElements.length > 0) {
                animateElement(shakeableElements[0], 'shake');
            }
        }
        // wait 15 seconds to animate the rest of the shakeable elements on the page
        setTimeout(function() {
            if (gdpHarlemShake.isShaking) {
                for (var j = 0; j < shakeableElements.length; j++) {
                    animateElement(shakeableElements[j]);
                }
            }
        }, 15 * 1000);

        /* Reset the party as it was */
        setTimeout(function() {
            if (gdpHarlemShake.isShaking) {
                // play the song that was playing before the Harlem Shake
                gdpMedia.playPreviousSong();
                gdpHarlemShake.isShaking = false;
                // stop all of the animations
                $('.gdpAnimated').removeClass("gdpAnimated animated infinite " + animations.join(' '));
            }
        }, 30 * 1000);
    }
};
