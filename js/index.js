/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		
			
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};



//FUNCION DE CARGADO
$( document ).on( "click", ".show-page-loading-msg", function() {
    var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
    $.mobile.loading( "show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
    });
})

//FIN FUNCION CARGADO

//FUNCION CARGAR AGENDA

function cargarAgenda()
{
	
if(localStorage.getItem("seccion")!="agenda")
{
$.ajax({
url: 'http://aquarium.com.ar/agencias/reply.php?jsoncallback=?',
type: 'GET',
data: {
pk_usuario: localStorage.getItem("pk_usuario")
},
dataType: 'json',
error: function(jqXHR, text_status, strError) {
alert("No hay internet.");

    $.mobile.loading( "hide" );
},
timeout: 60000,
success: function(data) {
	
		$('#contenidoagenda').html('');
	for(i in data)
	{
		$('#contenidoagenda').append('<li><a href="tel:'+data[i].telefono+'"><strong>'+data[i].nombre+'</strong> | '+data[i].email+' | '+data[i].telefono+'</a></li>');	
	}


$('#agenda').trigger("create");
$('#agenda').trigger("refresh");

$.mobile.changePage("#agenda");
localStorage.setItem('seccion',"agenda");



    $.mobile.loading( "hide" );

}
});


}

}

// FIN FUNCION CARGAR AGENDA

//FUNCION CARGAR procesados

function cargarPendientes()
{
	
if(localStorage.getItem("seccion")!="pendientes")
{
$.ajax({
url: 'http://aquarium.com.ar/agencias/replypedidos.php?jsoncallback=?',
type: 'GET',
data: {
pk_usuario: localStorage.getItem("pk_usuario"),
estado:1
},
dataType: 'json',
error: function(jqXHR, text_status, strError) {
alert("No hay Conexión");

    $.mobile.loading( "hide" );
},
timeout: 60000,
success: function(data) {
	
		pedido=0;
		suma=0;
		
			$('#contenidopendientes').html('');
		if(data!=null)
		{
		
	for(i in data)
	{
		if(data[i].pk_pedido!=pedido)
		{
			if(pedido!=0)
			{
				$('#contenidopendientes').append('<div class="ui-block-a"><h5>Observaciones: '+descripcion+'</h5></div> <div class="ui-block-a"><h4>TOTAL: $'+suma+'</h4></div> <div class="ui-block-a"><input type="button" id="rechazar'+pk_pedido+'" onclick="cambiarestado('+pk_pedido+',5)" data-icon="forbidden" value="Rechazar"></div>                    <div class="ui-block-b"><input type="button" id="aprobar'+pk_pedido+'" onclick="cambiarestado('+pk_pedido+',2)" data-icon="plus" value="Aprobar"></div>                    <div class="ui-block-a"><input type="button" data-icon="delete" id="cancelar'+pk_pedido+'" onclick="cambiarestado('+pk_pedido+',4)" value="Cancelar"></div>                    <div class="ui-block-b"><input type="button" id="pagado'+pk_pedido+'" data-icon="check" value="Pagado" onclick="cambiarestado('+pk_pedido+',3)"></div>                    ');
	
			}
			
			$('#contenidopendientes').append('<div class="ui-block-a" ><h4>NRO: '+data[i].pk_pedido+'</h4></div>                    <div class="ui-block-b"><h4>Cliente: '+data[i].nombre+'</h4></div>                    <div class="ui-block-d"><h4>Fecha : '+data[i].fecha+'</h4></div>');
			
			
			
			pedido=data[i].pk_pedido;
			suma=0;
			
		}
		
			suma=suma+(data[i].cantidad*data[i].precio_unidad);
		
		$('#contenidopendientes').append(' <div class="ui-block-a" ><div class="ui-bar ui-bar-a"><h5>'+data[i].cantidad+' X '+data[i].detalle+'  ($'+data[i].precio_unidad+' x U.)  $'+(data[i].cantidad*data[i].precio_unidad)+'</h5></div></div>');
		
		descripcion=data[i].descripcion;
		pk_pedido=data[i].pk_pedido;
		
		
	}
	//2=>'Aprobado',4=>'Cancelado',1=>'Pendiente',3=>'Pago',5=>'Rechazado'
	$('#contenidopendientes').append('<div class="ui-block-a"><h5>Observaciones: '+descripcion+'</h5></div> <div class="ui-block-a"><h4>TOTAL: $'+suma+'</h4></div> <div class="ui-block-a"><input type="button" id="rechazar'+pk_pedido+'" onclick="cambiarestado('+pk_pedido+',5)" data-icon="forbidden" value="Rechazar"></div>                    <div class="ui-block-b"><input type="button" id="aprobar'+pk_pedido+'" onclick="cambiarestado('+pk_pedido+',2)" data-icon="plus" value="Aprobar"></div>                    <div class="ui-block-a"><input type="button" data-icon="delete" id="cancelar'+pk_pedido+'" onclick="cambiarestado('+pk_pedido+',4)" value="Cancelar"></div>                    <div class="ui-block-b"><input type="button" id="pagado'+pk_pedido+'" data-icon="check" value="Pagado" onclick="cambiarestado('+pk_pedido+',3)"></div>                    ');
	
	
		}

$('#pendientes').trigger("create");
$('#pendientes').trigger("refresh");

$.mobile.changePage("#pendientes");
localStorage.setItem('seccion',"pendientes");



    $.mobile.loading( "hide" );

}
});

}

}

// FIN FUNCION CARGAR PENDIENTES

//FUNCION DE CAMBIAR ESTADO

function cambiarestado(pedido,estado)
{

$.ajax({
url: 'http://aquarium.com.ar/agencias/replyestado.php?jsoncallback=?',
type: 'GET',
data: {
pedido: pedido,
estado: estado
},
dataType: 'json',
error: function(jqXHR, text_status, strError) {
alert("No hay Conexión");
},
timeout: 60000,
success: function(data) {


if (data.validacion == "ok") {
	
	 $('#rechazar'+pedido).css("background","red");
	 $('#aprobar'+pedido).css("background","red"); 
	 $('#cancelar'+pedido).css("background","red");
	 $('#pagado'+pedido).css("background","red");
	
	if(estado==5) $('#rechazar'+pedido).css("background","green");
	if(estado==2) $('#aprobar'+pedido).css("background","green");
	if(estado==4) $('#cancelar'+pedido).css("background","green");
	if(estado==3) $('#pagado'+pedido).css("background","green");
} 


}
});



	
}

//FIN FUNCION



//FUNCION CARGAR procesados

function cargarProcesados()
{
	
if(localStorage.getItem("seccion")!="procesados")
{
$.ajax({
url: 'http://aquarium.com.ar/agencias/replypedidos.php?jsoncallback=?',
type: 'GET',
data: {
pk_usuario: localStorage.getItem("pk_usuario"),
estado:2
},
dataType: 'json',
error: function(jqXHR, text_status, strError) {
alert("No hay Conexión");

    $.mobile.loading( "hide" );
},
timeout: 60000,
success: function(data) {
	
	
		pedido=0;
		suma=0;
		
			$('#contenidoprocesados').html('');
			
		if(data!=null)
		{
	for(i in data)
	{
		if(data[i].pk_pedido!=pedido)
		{
			if(pedido!=0)
			{
				$('#contenidoprocesados').append('<div class="ui-block-a"><h5>Observaciones: '+descripcion+'</h5></div> <div class="ui-block-a"><h4>TOTAL: $'+suma+'</h4></div> ');
	
			}
			
			$('#contenidoprocesados').append('<div class="ui-block-a" ><h4>NRO: '+data[i].pk_pedido+'</h4></div>                    <div class="ui-block-b"><h4>Cliente: '+data[i].nombre+'</h4></div>                    <div class="ui-block-d"><h4>Fecha : '+data[i].fecha+'</h4></div>');
			
			
			pedido=data[i].pk_pedido;
			suma=0;
			
		}
		
			suma=suma+(data[i].cantidad*data[i].precio_unidad);
		
		$('#contenidoprocesados').append(' <div class="ui-block-a" ><div class="ui-bar ui-bar-a"><h5>'+data[i].cantidad+' X '+data[i].detalle+'  ($'+data[i].precio_unidad+' x U.)  $'+(data[i].cantidad*data[i].precio_unidad)+'</h5></div></div>');
		
		descripcion=data[i].descripcion;
		pk_pedido=data[i].pk_pedido;
		
		
	}
	//2=>'Aprobado',4=>'Cancelado',1=>'Pendiente',3=>'Pago',5=>'Rechazado'
	$('#contenidoprocesados').append('<div class="ui-block-a"><h5>Observaciones: '+descripcion+'</h5></div> <div class="ui-block-a"><h4>TOTAL: $'+suma+'</h4></div> ');
	
		}


$('#procesados').trigger("create");
$('#procesados').trigger("refresh");

$.mobile.changePage("#procesados");
localStorage.setItem('seccion',"procesados");



    $.mobile.loading( "hide" );

}
});

}

}

// FIN FUNCION CARGAR procesados