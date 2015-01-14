// JavaScript Document
function checkConnection() { 
    var states = {}; 
    states[Connection.UNKNOWN]  = 'Unknown connection'; 
    states[Connection.ETHERNET] = 'Ethernet connection'; 
    states[Connection.WIFI]     = 'WiFi connection'; 
    states[Connection.CELL_2G]  = 'Cell 2G connection'; 
    states[Connection.CELL_3G]  = 'Cell 3G connection'; 
    states[Connection.CELL_4G]  = 'Cell 4G connection'; 
    states[Connection.CELL]     = 'Cell generic connection'; 
    states[Connection.NONE]     = 'No network connection'; 
	if(states[networkState]=='No network connection')
	alert("Este dispositivo no tiene conexión"); 
	
	

} 

var networkState; 



var app = { 
    initialize: function() { 
        this.bindEvents(); 
    }, 
    bindEvents: function() { 
        document.addEventListener('deviceready', this.onDeviceReady, false); 
    }, 
    onDeviceReady: function() { 
        networkState = navigator.connection.type; 
        checkConnection(); 

		
		$(document).ready(function(e) {   
							  $("div:jqmData(role='panel')").css('margin-top',  ($("div:jqmData(role='header')").height()));   
							}); 
    } 
}; 