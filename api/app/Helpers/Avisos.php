<?php
namespace App\Helpers;

use Illuminate\Support\Facades\BD;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use App\Exception\AvisosException;
use App\Aviso;
use App\Informacion;

class Avisos{
    protected $correo_oficial;
    protected $correo_soporte;
    protected $nombre_oficial;

    /**
     * Setea los correos y html por defecto
     */
    public function __construct(){
        $this->setearCorreos();
    }

    /**
     * Eniva uan consulta hecha desde el form de la web
     */
    public function correoWeb($email,$nombre,$mensaje,$telefono){

        //agrego nombre y email
        $consulta = '
            > Nombre: '.$nombre.'<br>
            > Correo: '.$email.'<br>
        ';

        //agrego telefono si lo puso
        if(!is_null($telefono)){
            $consulta.='
                > Teléfono: '.$telefono.'<br>
            ';
        }

        //agrego el mensaje
        $consulta.='
            > Mensaje: '.$mensaje.'<br>
        ';

        $this->agregarCorreo($this->correo_oficial,'Consulta enviada desde la web',$consulta,$email,$nombre);        
    }

    /**
     * Eniva uan consulta hecha desde el form de la web
     */
    public function sumate($nombre, $apellido, $email, $telefono, $imagen, $cv){

        //agrego nombre y email
        $consulta = '
            > Nombre: '.$nombre.'<br>
            > Apellido: '.$apellido.'<br>
            > Correo: '.$email.'<br>
        ';

        //agrego telefono si lo puso
        if(!is_null($telefono)){
            $consulta.='
                > Teléfono: '.$telefono.'<br>
            ';
        }

        $adjuntos = [['imagen',$imagen],['cv',$cv]];

        $this->enviarCorreo($this->correo_oficial,'Solicitud de ingreso',$consulta,$email,$nombre,$adjuntos);        
    }


    /**
     * Envia los avisos actuales
     */
    public function enviarAvisos(){

        //obtengo los envios
        $avisos = Aviso::where('enviado','=',0)->get();

        //recorro los avisos y los voy enviando
        foreach($avisos as $aviso){
            
            try{
                //envio el correo
                $this->enviarCorreo($aviso->destinatario,$aviso->asunto,$aviso->mensaje,$aviso->emisor,$aviso->emisor_nombre);

                // pongo como enviado el mail
                $aviso->enviado = 1;
                $aviso->save();
            
            }catch(Exception $e){
                //envio un correo de falla a mi correo
                $this->enviarCorreo($this->correo_soporte,'No se envia mail -'.$aviso->asunto,$aviso->mensaje,'error@cuidarsaludarg.com',$aviso->emisor_nombre);     
            }
        }
    }

    /**
     * Se envia un mail
     * $to: correo al que se envia el mail
     * $asunto: asunto que se muestra en el correo
     * $mensaje: cuerpo del mensaje en formato HTML
     * $from: correo desde el que se envia el mail
     * $from_name: nombre representativo del cual se envia el mail
     * $archivo: adjunto a enviar
     */
    private function enviarCorreo($to,$asunto,$mensaje,$from,$from_name=NULL,$adjuntos=NULL){

        //crear instancia
        $mail = new PHPMailer();
        //tipo de envio
        $mail->isSMTP();
        //tipo de smtp
        $mail->SMTPDebug = false;
        //host mail de neolo
        $mail->Host = 'mail.detailingbahia.com';
        // puerto para ssl/tls
        $mail->Port = 465;
        //seguridad
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = "ssl";
        //usuario y pass
        $mail->Username = '_mainaccount@detailingbahia.com';
        $mail->Password = 'Bahia1520!';
        //quien envia
        if($from_name!=NULL){
            $mail->setFrom($from, $from_name);
            $mail->addReplyTo($from,$from_name);
        }else{
            $mail->setFrom($from);
            $mail->addReplyTo($from);		
        }
        //a quien manda
        $mail->addAddress($to);
    
        //asunto y mensaje
        $mail->Subject = $asunto;
        $mail->isHTML(true);
        $mail->Body = $mensaje;
        $mail->CharSet = 'UTF-8';
    
        //agreagr archivo
        if(!is_null($adjuntos)){            
            foreach($adjuntos as $adjunto){
                $mail->addAttachment($adjunto[1]->getRealPath(),$adjunto[0].'.'.$adjunto[1]->extension());                
            }
        }
        
        //enviar correo
        if(!$mail->send()){
            throw new Exception($mail->ErrorInfo);
        }

    }
    
    /**
     * Se agrega un correo a la base de datos. El sistema se encarga de enviarlo cuando es correcto.
     * $to: correo al que se envia el mail
     * $asunto: asunto que se muestra en el correo
     * $mensaje: cuerpo del mensaje en formato HTML
     * $from: correo desde el que se envia el mail
     * $from_name: nombre representativo del cual se envia el mail
     * $archivo: adjunto a enviar
     */
    public function agregarCorreo($to,$asunto,$mensaje,$from,$from_name=NULL,$archivo=NULL){

        //creo el aviso
        $aviso = new Aviso();
        $aviso->destinatario = $to;
        $aviso->asunto = $asunto;
        $aviso->mensaje = $mensaje;
        $aviso->emisor = $from;
        $aviso->emisor_nombre = $from_name;
        $aviso->adjunto = $archivo;
        $aviso->enviado = 0;

        $aviso->save();
    }

    /**
     * Setea los correos por defecto
     */
    private function setearCorreos(){
        $info = Informacion::where('id',1)->first();

        if(is_object($info)){
            $this->correo_oficial = $info->email;
            $this->nombre_oficial = $info->nombre;
        }
        $correo_soporte = 'xeron08@hotmail.com';
    }
}


