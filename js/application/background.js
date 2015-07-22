var url = "http://streamsquid.com/";

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {    
	if(typeof message === typeof {} ) {
		switch(message.action) {
			case "tooltip": 
				chrome.browserAction.setTitle( { title: message.title } )
				break;
			default:
				SendMessage(message);
				break;
		}
	}
});


chrome.commands.onCommand.addListener(function(command) {
	SendMessage({ action: command });
    //console.log('Command:', command);
});

function SendMessage(message) {	
	chrome.tabs.query({ status: 'complete', url: url}, function (tabs) {
		var currentTab = tabs[0];	
		if(currentTab) {			
			chrome.tabs.sendMessage(currentTab.id, message);			
		}
	});
}