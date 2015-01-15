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
	alert('Sin conexion a Internet'); 
	
	

} 

var networkState; 


$(document).ready(function(e) {   
  $("div:jqmData(role='panel')").css('margin-top',  ($("div:jqmData(role='header')").height()));   
});


		var db;
//GENERA LOS ELEMENTOS DEL FORMULARIO
function connect() 
			{ 
			$.ajax({ 
			url:'http://mxxiv.com.ar/aqm/reply.php?jsoncallback=?', 
			type:'POST', 
			data:{lista_pk:1}, 
			dataType:'json', 
			error:function(jqXHR,text_status,strError){ 
			alert("Sin Conexión");}, 
			timeout:60000, 
			success:function(data){ 
				
				$("#result").html('');
			
			for(var i in data){ 

				$("#result").append('<li><a href="" onclick="agregar("'+data[i].pk_producto+'",'+data[i].producto+',"'+data[i].precio_lista+'");" style="height:50px" class="ui-btn ui-btn-icon-right ui-icon-carat-r">'+data[i].producto+' $'+data[i].precio_lista+'</a></li>');
				
			} 

			} 
			});} 
			

function cerrarsesion()
{
	
	
		
		var db = window.sqlitePlugin.openDatabase("Database", "1.0", "Demo", -1);
       
	   db.transaction(function(tx) {
        tx.executeSql('delete from test_table');


      });
	   
	   
				$.mobile.changePage("#inicio");
		



     
	
}
			


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
		
		var db = window.sqlitePlugin.openDatabase("Database", "1.0", "Demo", -1);

      db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');


          tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
            if(res.rows.item(0).cnt>0) 
			{
				$.mobile.changePage("#home");
				connect();
			
			}
          });


      });
		
    } 
}; 