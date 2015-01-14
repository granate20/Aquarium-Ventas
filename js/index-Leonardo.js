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
		if(networkState==Connection.NONE) alert("SIN ACCESO A INTERNET");
		else
		{
			app.receivedEvent('deviceready');
			}
    }, 
	receivedEvent: function(id) { 
        var parentElement = document.getElementById(id); 
        var listeningElement = parentElement.querySelector('.listening'); 
        var receivedElement = parentElement.querySelector('.received'); 

        listeningElement.setAttribute('style', 'display:none;'); 
        receivedElement.setAttribute('style', 'display:block;'); 

        console.log('Received Event: ' + id); 
        var pushNotification = window.plugins.pushNotification; 
        if (device.platform == 'android' || device.platform == 'Android') { 
            alert("Bienvenido al Aquarium"); 
            //tu Project ID aca!! 
            pushNotification.register(this.successHandler, this.errorHandler,{"senderID":"4153173290","ecb":"app.onNotificationGCM"}); 
        } 
        else { 
            alert("Bienvenido al Aquarium"); 
            pushNotification.register(this.successHandler,this.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"}); 
        } 
    }, 
    // result contains any message sent from the plugin call 
    successHandler: function(result) { 
        //alert('Callback Success! Result = '+result) 
    }, 
    errorHandler:function(error) { 
        alert(error); 
    }, 
    onNotificationGCM: function(e) { 
        switch( e.event ) 
        { 
            case 'registered': 
                if ( e.regid.length > 0 ) 
                { 
                    console.log("Regid " + e.regid); 
                    //alert('registration id = '+e.regid); 
                    //Cuando se registre le pasamos el regid al input 
                    document.getElementById('regId').value = e.regid; 
                } 
            break; 

            case 'message': 
              // NOTIFICACION!!! 
              alert('message = '+e.message); 
            break; 

            case 'error': 
              alert('Eror de Coenxion = '+e.msg); 
            break; 

            default: 
              alert('Sin Mensajes'); 
              break; 
        } 
    }, 
    onNotificationAPN: function(event) { 
        var pushNotification = window.plugins.pushNotification; 
        alert("Running in JS - onNotificationAPN - Received a notification! " + event.alert); 
         
        if (event.alert) { 
            navigator.notification.alert(event.alert); 
        } 
        if (event.badge) { 
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, this.errorHandler, event.badge); 
        } 
        if (event.sound) { 
            var snd = new Media(event.sound); 
            snd.play(); 
        } 
    } 
};