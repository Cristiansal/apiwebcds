


function calcula_ipjs() {
    var Red_ip=0;          // Primer octeto de la Red 
    var Clase='';          // Clase de la Red
   
    var mask2=[];          // Contenedor de la mascara
    var tamtemp=0;         // Tamaño de la mascara
    var textip0='';     
    var textip1='';
    var textip2='';
    var textip3='';
    var Network='';      // contenedor para toda la red 
    var upa=[];          // Rango minimo de la red 
    // obtiene los valores desde el formulario 
    var oct0 = document.getElementById("numero1").value;
    var oct1 = document.getElementById("numero2").value;
    var oct2 = document.getElementById("numero3").value;
    var oct3 = document.getElementById("numero4").value;
    var mask = document.getElementById('mascaraht').value;          // Mascara traida de HTML
    var resultado = (oct0 - oct1);
     // Alerta en caso de dejar campos vacios o por fuera de [0~255].
     if (oct0=='' || oct1=='' || oct2==''|| oct3==''|| mask==''){

       return alert('Complete todos los campos!'); 
    } 
    if (oct0<0 || oct0>255 || oct1<0 || oct1>255 || oct2<0 || oct2>255|| oct3<0 || oct3>255|| mask<0){

        return alert('la dirección debe contener valores entre [0~255]. La mascara debe estar entre [0~32]!'); 
     } 

    // Ciclo para poner los '1's de la mascara de Red
    for(var i=0; i<mask;i++){
        mask2[i]=1;
        tamtemp=mask2.length; 
    }
    // Ciclo para completar con '0's la mascara de Red.
    for(var i=tamtemp; i< 32;i++){
    mask2[i]=0;
    }

    console.log(mask2);
    console.log('La mascara es ' + tamtemp); 
    // muestra la mascara en binario en html
    var M_mask= mask2.join('');
    for(var i=0; i<32; i++){
    }
    var resta= 32-tamtemp;
    var Num_Host = Math.pow(2, resta);
    Num_Host=Num_Host-2;
    // presenta el numero de host en html
    document.getElementById('out_numhost').innerHTML = Num_Host;
    console.log('el numero de host es ---?'+Num_Host);

    document.getElementById('out_mask').innerHTML = M_mask;
    // presenta los octetos como llegan del HTML
    console.log('no se0-->'+ oct0);
    console.log('no se1-->'+ oct1);
    console.log('no se2-->'+ oct2);
    console.log('no se3-->'+ oct3);
    // Conviete los octetos de String a Entero
    var yu0 = parseInt(oct0);
    var yu1 = parseInt(oct1);
    var yu2 = parseInt(oct2);
    var yu3 = parseInt(oct3);
   // Convierte los enteros a binario
    var pr0=yu0.toString(2);
    var pr1=yu1.toString(2);
    var pr2=yu2.toString(2);
    var pr3=yu3.toString(2);
    // presenta los octetos en binario
    console.log('a binario0-->'+ pr0);
    console.log('a binario1-->'+ pr1);
    console.log('a binario2-->'+ pr2);
    console.log('a binario3-->'+ pr3);
    // Unir los octetos en una cadena para beneficio del bajo tipado
    textip0=pr0;
    textip1=pr1;
    textip2=pr2;
    textip3=pr3;
    // funcion para anteponer ceros a los octetos
    function ZeroFill (number){
        var f_tamano= number.length;
        var Zsalida='';
        var diference=0;
        if (number=='0'){
            Zsalida='00000000';
            return Zsalida;
        } else if (f_tamano<8){
            diference=8-f_tamano;
                for( var i =0; i< diference; i++){
                    Zsalida=Zsalida+'0';
        
                }
        }
    return Zsalida+number;
    }
    // realiza el procedimiento para cada octeto
    textip0= ZeroFill(textip0);
    textip1= ZeroFill(textip1);
    textip2= ZeroFill(textip2);
    textip3= ZeroFill(textip3);
    //concatena los octetos en un solo estring 
    Network= textip0+textip1+textip2+textip3;
    console.log('la Network Completa es  cmpt--> ' + Network);
    // muestra la red en binario
    document.getElementById('out_net0').innerHTML = Network;

    // funcion para realizar la operacion and bit a bit 
    for (var i=0; i<32; i++){

        upa[i] = Network[i] & mask2[i];   
    }
    console.log('@@@@@@@@@@');
    console.log('desde el rangooo (and bit a bit )'+ upa);
    console.log('@@@@@@@@@@');
    var Rm0=[];
    var Rm1=[];
    var Rm2=[];
    var Rm3=[];
    var LS0=[];
    var LS1=[];
    var LS2=[];
    var LS3=[];
    var aux1=0;
    var aux2=0;
    var aux3=0;
    var limiteS=[];
    for(var i=0; i<32;i++){
        if (i<tamtemp){
        limiteS[i]=Network[i];
        }
        else if (i>=tamtemp && i<32){
            limiteS[i]= 1;
        }
    }
    console.log('esta es solo la red sin la mascara---> '+ limiteS);

   

    // ciclo para separara en 4 octetos el rango minimo de la red
    function SepararOcteto (oct_In, octA,octB,octC,octD){
        for(var i=0; i<32;i++){
            if (i<8){
                octA[i]=oct_In[i];
            }
            else  if (i>=8 && i<16){
                octB[aux1]=oct_In[i];
                aux1 ++;
            }
            else if(i>=16 &&  i<24){
                octC[aux2]=oct_In[i];
                aux2 ++;
            }
            else if(i>=24 && i<32){
                octD[aux3]=oct_In[i];
                aux3 ++;
            }
        }
        aux1=0;
        aux2=0;
        aux3=0;
        return oct_In,octA,octB,octC,octD;
    }
    SepararOcteto(upa,Rm0,Rm1,Rm2,Rm3);
    SepararOcteto(limiteS,LS0,LS1,LS2,LS3);

    // ahora calcular el limite superior  de la red 

    // muestra los octetos (rango minimo)
    console.log('muestar el Primer octeto del rango minimo'+ Rm0);
    console.log('muestar el Segundo  octeto del rango minimo'+ Rm1);
    console.log('muestar el Tercero  octeto del rango minimo'+ Rm2);
    console.log('muestar el Cuarto  octeto del rango minimo'+ Rm3);


    //// muestra los octetos (rango maximo)
    console.log('#####################')
    console.log('muestar el Primer octeto del rango maximo'+ LS0);
    console.log('muestar el Segundo  octeto del rango maximo'+ LS1);
    console.log('muestar el Tercero  octeto del rango maximo'+ LS2);
    console.log('muestar el Cuarto  octeto del rango maximo'+ LS3);
    // Funcion para convertir de binario a decimal

    function Bin2Dec (fvar2){
        let binario = fvar2.join('');
        console.log(binario);
        let binarioEnDecimal = parseInt(binario, 2); // La base es 2
        return binarioEnDecimal;
    }

    var Rango0=Bin2Dec(Rm0);
    console.log('esto hace la funcion de 2a10////'+Rango0);
    var Rango1=Bin2Dec(Rm1);
    console.log('esto hace la funcion de 2a10////'+Rango1);
    var Rango2=Bin2Dec(Rm2);
    console.log('esto hace la funcion de 2a10////'+Rango2);
    var Rango3=Bin2Dec(Rm3);
    console.log('esto hace la funcion de 2a10////'+Rango3);
    // hasta aqui muestra el rango minimo de la red 
    document.getElementById('lbResultado0').innerHTML = Rango0;
    document.getElementById('lbResultado1').innerHTML = Rango1;
    document.getElementById('lbResultado2').innerHTML = Rango2;
    document.getElementById('lbResultado3').innerHTML = Rango3;
    // Gateway de la red
    var Rango3=Rango3+1;
    document.getElementById('out_gateway0').innerHTML = Rango0;
    document.getElementById('out_gateway1').innerHTML = Rango1;
    document.getElementById('out_gateway2').innerHTML = Rango2;
    document.getElementById('out_gateway3').innerHTML = Rango3;
    // Primer host de la red 
    var Rango3=Rango3+1;
    document.getElementById('out_host0').innerHTML = Rango0;
    document.getElementById('out_host1').innerHTML = Rango1;
    document.getElementById('out_host2').innerHTML = Rango2;
    document.getElementById('out_host3').innerHTML = Rango3;

    // Realizar el procedimiento de convertir de binario a Decimal
    var Rango0=Bin2Dec(LS0);
    console.log('esto hace la funcion de 2a10////'+Rango0);
    var Rango1=Bin2Dec(LS1);
    console.log('esto hace la funcion de 2a10////'+Rango1);
    var Rango2=Bin2Dec(LS2);
    console.log('esto hace la funcion de 2a10////'+Rango2);
    var Rango3=Bin2Dec(LS3);
    console.log('esto hace la funcion de 2a10////'+Rango3);
    // Presenta  el limite de la red  en HTML
    document.getElementById('lbResultado4').innerHTML = Rango0;
    document.getElementById('lbResultado5').innerHTML = Rango1;
    document.getElementById('lbResultado6').innerHTML = Rango2;
    document.getElementById('lbResultado7').innerHTML = Rango3;
    // Presenta el ultimo Broadcast en HTML
    document.getElementById('out_broad0').innerHTML = Rango0;
    document.getElementById('out_broad1').innerHTML = Rango1;
    document.getElementById('out_broad2').innerHTML = Rango2;
    document.getElementById('out_broad3').innerHTML = Rango3;
    // Ultimo Host
    var Rango3=Rango3-1;
    document.getElementById('out_host4').innerHTML = Rango0;
    document.getElementById('out_host5').innerHTML = Rango1;
    document.getElementById('out_host6').innerHTML = Rango2;
    document.getElementById('out_host7').innerHTML = Rango3;

    Red_ip=oct0;
    // Evaluar el tipo de clase de la Red 
    if (Red_ip>0 && Red_ip<128){
        Clase='Clase A';
    console.log(Clase);
    }
    else if(Red_ip>=128 && Red_ip<192){

        Clase='Clase B';
        console.log(Clase);
    }
    else if(Red_ip>=192 && Red_ip<224){
        Clase='Clase C';
        console.log(Clase);

    }
    else if(Red_ip>=224 && Red_ip<240){
        Clase='Clase D';
        console.log(Clase);

    }
    else if(Red_ip>=240 && Red_ip<248){
        Clase='Clase E';
        console.log(Clase);

    }
 
    document.getElementById('out_class').innerHTML = Clase;

}