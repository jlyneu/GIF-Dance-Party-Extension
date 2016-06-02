/**
 * Provides the "WHAT'S NEW WITH GDPE?" dialog displaying GDP changes when the party is
 * started after a new version is released.
 */
gdpChangeLog = {
    /* Display the change log for the user if either there is no cached
       version number in chrome storage or if the cached version doesn't
       match the current GDP extension version in the manifest. Don't
       display the change log if the manifest cannot be fetched */
    checkForUpdates: function() {
        try {
            // fetch manifest to get version number
            var manifest = chrome.runtime.getManifest()
        } catch (e) {
            // supposedly getManifest doesn't work for versions of Chrome less
            // than 22 so don't bother with the versions
            return;
        }

        var currentVersion = manifest.version;

        // fetch the cached version from chrome storage
        chrome.storage.sync.get("cachedVersion", function(storageItem) {
            if (currentVersion !== storageItem['cachedVersion']) {
                // update the cached version to be the current version
                chrome.storage.sync.set({
                    cachedVersion: currentVersion
                });
                // open the "What's New?" change log dialog
                gdpChangeLog.openChangeLog();
            }
        });
    },
    /* Remove the change log dialog if it is open */
    closeChangeLog: function() {
        $('.gdp-change-log-background').remove();
    },
    /* Open the change log dialog on the page. Clicking the CONTINUE
       button or clicking outside the dialog will close the dialog. */
    openChangeLog: function() {
        // transparent full screen div that contains the version changes, but
        // will close on click
        var gdpChangeLogBackground = $('<div class="gdp-menu gdp-change-log-background"></div>')
            .css('z-index', maxZIndex)
            .click(function() {
                $(this).remove();
            });

        // actual dialog displaying all of the content
        var gdpChangeLogDialog = $('<div class="gdp-change-log-dialog"></div>')
            .click(function(event) {
                event.stopPropagation();
            });

        // "WHAT'S NEW WITH GDP" dialog header
        var gdpChangeLogHeader = ['<div class="gdp-change-log-dialog-header">',
                                      '<img class="gdp-change-log-dancer" src="https://media.giphy.com/media/l3E6vsDRqWFYlwg6Y/giphy.gif"/>',
                                      "<span>WHAT'S NEW WITH GDPE?</span>",
                                      '<img class="gdp-change-log-dancer" src="https://media.giphy.com/media/l3E6vsDRqWFYlwg6Y/giphy.gif"/>',
                                  '</div>'].join('');

        // body of dialog containing version changes
        var gdpChangeLogBody = $('<div class="gdp-change-log-dialog-body"></div>');

        // loop through each release version
        for (var i = 0; i < gdpChangeLog.updates.length; i++) {
            var currentLogDiv = $('<div class="gdp-change-log-dialog-entry"></div>');
            var currentLog = gdpChangeLog.updates[i];

            // displays release date of version
            var logDate = ['<div class="gdp-change-log-dialog-date">',
                               currentLog.date,
                           '</div>'].join('');
            currentLogDiv.append(logDate);

            // displays all changes for the current version
            var logDescription = $('<ul class="gdp-change-log-dialog-description"></ul>');

            // loop through each individual change within the current version
            for (var j = 0; j < currentLog.description.length; j++) {
                var logChange = ['<li class="gdp-change-log-dialog-li">',
                                     currentLog.description[j],
                                 '</li>'].join('');
                logDescription.append(logChange);
            }

            // append components for the changes to the dialog body
            currentLogDiv.append(logDescription);
            gdpChangeLogBody.append(currentLogDiv);
        }

        // continue button that will dismiss the dialog on-click
        var continueButton = $('<div class="gdp-change-log-continue">CONTINUE</div>')
            .click(function() {
                $('.gdp-change-log-background').remove();
            })

        // append change log components together and to the DOM body
        gdpChangeLogDialog.append(gdpChangeLogHeader);
        gdpChangeLogDialog.append(gdpChangeLogBody);
        gdpChangeLogDialog.append(continueButton);
        gdpChangeLogBackground.append(gdpChangeLogDialog);
        $('body').append(gdpChangeLogBackground);
    },
    /* Updates to be displayed to the user in the change log dialog */
    updates: [
        {
            "date": "June 2, 2016",
            "description" : [
                "You can now add a custom song from YouTube by providing a normal YouTube url " +
                    "(i.e. https://www.youtube.com/watch?v=npjF032TDDQ) in the 'Add a custom song '" +
                    "URL or YouTube link.' input field when selecting a song. In order to comply with " +
                    "YouTube's terms of service, the video itself will be displayed next to the other " +
                    "menu buttons.",
                "You can now also add a custom gif dancer by providing a normal Giphy url " +
                    "(i.e. http://giphy.com/gifs/texas-taco-tacos-xT4uQulxzV39haRFjG) in the " +
                    "'Add a custom gif url' input field when adding a dancer.",
                "Added the song from http://www.breadfish.co.uk to the song list (BREADFISH).",
                "Added several more gif dancers to the list."
            ]
        },
        {
            "date": "December 13, 2015",
            "description": [
                "Added a new SHAKE button at the bottom of the screen. Try it out!"
            ]
        }]
};
