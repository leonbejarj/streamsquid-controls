/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    switch(msg.action) {
        case "toggleSong":
            toggleSong();
            break;
        case "nextSong":
            nextSong();
            break;
        case "previousSong":
            previousSong();
            break;
    }    
});

function toggleSong() {
    if(document.getElementById('player-pause').clientHeight > 0)
        document.getElementById('player-pause').click();
    else
        document.getElementById('player-play').click();	
}

function nextSong() {
	document.getElementById('player-next').click();	
}

function previousSong() {
	document.getElementById('player-back').click();	
}
/**********| Content |**********/
window.onload = function() {
    var observables = document.querySelector('#player-track-artist');

    var observer = new MutationObserver(function(mutations) {                
        mutations.forEach(function(mutation) {
            if(typeof mutation.target.textContent != "")
                chrome.runtime.sendMessage({ 
                    action : "tooltip", 
                    title: document.getElementById('player-track-name').innerText + " - " + document.getElementById('player-track-artist').innerText
                });            
        });    
    });

    var config = { characterData: true, subtree: true, childList: true };
    observer.observe(observables, config);
}
