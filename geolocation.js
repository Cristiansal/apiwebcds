/* function iniciar(){
    var boton=document.getElementById('obtener');
    boton.addEventListener('click', obtener, false);
    }
    function obtener(){
    navigator.geolocation.getCurrentPosition(mostrar);
    }
    function mostrar(posicion){
        var ubicacion=document.getElementById('ubicacion');
        var datos='';
        datos+='Latitud: '+posicion.coords.latitude+'<br>';
        datos+='Longitud: '+posicion.coords.longitude+'<br>';
        datos+='Exactitud: '+posicion.coords.accuracy+'mts.<br>';
        ubicacion.innerHTML=datos;
        }
        window.addEventListener('load', iniciar, false); */


        function iniciar(){
            var boton=document.getElementById('obtener');
            boton.addEventListener('click', obtener, false);
            }
            function obtener(){
            navigator.geolocation.getCurrentPosition(mostrar, errores);
            }
            function mostrar(posicion){
            var ubicacion=document.getElementById('ubicacion');
            var mapurl='http://maps.google.com/maps/api/staticmap?center='+
            posicion.coords.latitude+','+posicion.coords.longitude+'&zoom=12&size=400x400&sensor=false&markers='+posicion.coords.latitude+ ','+posicion.coords.longitude;

            ubicacion.innerHTML='<img src="'+mapurl+'">';
}
function errores(error){
alert('Error: '+error.code+' '+error.message);
}
window.addEventListener('load', iniciar, false);