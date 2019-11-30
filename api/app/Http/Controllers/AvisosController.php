<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Avisos;

class AvisosController extends Controller
{
    /**
     * Envia un correo simple
     */
    public function correoWeb(Request $request){

        //Recoger POST
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json,true);
        
        //guardamos las variables
        $nombre = (!is_null($json) && isset($params->nombre)) ? $params->nombre : null;
        $email =(!is_null($json) && isset($params->email)) ? $params->email : null;
        $telefono = (!is_null($json) && isset($params->telefono)) ? $params->telefono : null; 
        $mensaje = (!is_null($json) && isset($params->mensaje)) ? $params->mensaje : null; 

        //si existen datos: validamos datos
        if(!is_null($params_array)){

            //validar datos
            $validate = \Validator::make( $params_array, [
                'email' => 'required|email|max:45',
                'nombre' => 'required',
                'mensaje' => 'required'        
            ]);

            if(!$validate->fails()){

                $avisos = new Avisos();
                $avisos->correoWeb($email,$nombre,$mensaje,$telefono);
                $avisos->enviarAvisos();

                $data = array(
                    'status' => 'success',
                    'mensaje' => 'Se envio el mensaje'
                );

            
            //errores al validar    
            }else{
                $data = array(
                    'status' => 'error',
                    'code' => '404',
                    'errores' =>  $this->errores($validate->errors()),
                    'mensaje' => 'No se creó el usuario'
                );
            }
        // no hay datos por post    
        }else{
            $data = array(
                'status' => 'error',
                'code' => '404',
                'errores' =>  ['no hay datos por POST'],
                'mensaje' => 'No se creó el usuario'
            );
        }
        return $data;
    }
}
