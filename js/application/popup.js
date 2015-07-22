var url = "http://streamsquid.com/";
var url_atajos_teclado = "chrome://extensions/configureCommands";

chrome.tabs.query({ status: 'complete', url: url }, function (tabs) {
	var currentTab = tabs[0];
	if(!currentTab)
		chrome.tabs.create({ url: url, selected: true });
});

function ValidateTabOpened(action) {
	chrome.tabs.query({ status: 'complete', url: url }, function (tabs) {
		var currentTab = tabs[0];	
		if(currentTab && action) {		
			chrome.runtime.sendMessage({
				action : action
			});
		}
	})
}

window.onload = function() {
	document.getElementById('atajos').innerText = chrome.i18n.getMessage("keyboardShotcut");

	document.getElementById('play').onclick = function() {
		ValidateTabOpened("toggleSong");		
	}
	document.getElementById('next').onclick = function() {
		ValidateTabOpened("nextSong");
	}
	document.getElementById('prev').onclick = function() {
		ValidateTabOpened("previousSong");
	}
	document.getElementById('atajos').onclick = function() {
		chrome.tabs.create({ url: url_atajos_teclado, selected: true });
	}
}