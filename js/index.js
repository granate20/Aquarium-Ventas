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

        tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {

          tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
            alert("res.rows.length: " + res.rows.length + " -- should be 1");
            alert("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
          });

        }, function(e) {
          alert("ERROR: " + e.message);
        });
      });
		
    } 
}; 