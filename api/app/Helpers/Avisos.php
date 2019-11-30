<?php
namespace App\Helpers;

use Illuminate\Support\Facades\BD;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use App\Aviso;

class Avisos{
    protected $header, $cuerpo1, $cuerpo2, $footer;
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
     * Envia los avisos actuales
     */
    public function enviarAvisos(){

        //obtengo los envios
        $avisos = Aviso::where('enviado','=',0);

        //recorro los avisos y los voy enviando
        foreach($avisos as $aviso){
            
            try{
                //envio el correo
                $this->enviarCorreo($aviso->destinatario,$aviso->asunto,$aviso->mensaje,$aviso->emisor,$aviso->emisor_nombre,$aviso->adjunto);

                // pongo como enviado el mail
                $aviso->enviado = 1;
                $aviso->save();
            
            }catch(ExceptionCorreo $e){
                //envio un correo de falla a mi correo
                $this->enviarCorreo($this->correo_soporte,'No se envia mail -'.$aviso->asunto,$aviso->mensaje,'error@cuidarsaludarg.com',$aviso->emisor_nombre,$aviso->adjunto);     
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
    private function enviarCorreo($to,$asunto,$mensaje,$from,$from_name=NULL,$archivo=NULL){

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
        if(!is_null($archivo))
            $mail->addAttachment('../adjuntos/'.$archivo,$archivo);
        
        //enviar correo
        if(!$mail->send()){
            throw new ExceptionCorreo($mail->ErrorInfo);
        }

    }


    /**
     * Setea los correos
     */
    private function setearCorreos(){
        $info = Informacion::first();

        if(is_object()){
            $correo_oficial = $info->email;
            $nombre_oficial = $info->nombre;
        }
        
        $correo_soporte = 'xeron08@hotmail.com';
    }
}

