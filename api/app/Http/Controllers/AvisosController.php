<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Avisos;
use App\Exception\AvisosException;

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

    /**
     * Envia un correo simple
     */
    public function sumate(Request $request){

        //Recoger POST
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json,true);
        
        //guardamos las variables
        $nombre = (!is_null($json) && isset($params->nombre)) ? $params->nombre : null;
        $apellido = (!is_null($json) && isset($params->apellido)) ? $params->apellido : null;
        $email =(!is_null($json) && isset($params->email)) ? $params->email : null;
        $telefono = (!is_null($json) && isset($params->telefono)) ? $params->telefono : null; 
        $profesion = (!is_null($json) && isset($params->profesion)) ? $params->profesion : null; 
        $imagen= $request->file('imagen',null);
        $cv= $request->file('cv',null);

        //si existen datos: validamos datos
        if(!is_null($params_array)){

            //validar datos
            $validate = \Validator::make( $params_array, [
                'email' => 'required|email|max:45',
                'nombre' => 'required',    
                'apellido' => 'required',   
                'telefono' => 'required',       
            ]);

            if($validate->fails()){
                $data = array(
                    'status' => 'error',
                    'code' => '404',
                    'errores' =>  $this->errores($validate->errors()),
                    'mensaje' => 'No se creó el usuario'
                );
                return response()->json($data,200);    
            }

            // verificar imagen
            if(!is_null($imagen)){
   
                $validar=\Validator::make(["imagen"=>$imagen],[
                    'imagen' => 'mimes:jpeg,gif,png|required'
                ]);
 
                if($validar->fails()){
                   $data = array(
                      'status' => 'error',
                      'code' => 400,
                      'errores' => $this->errores($validar->errors()),
                      'messages' => 'Campos no validos',
                   );
                   return response()->json($data,200);    
 
                }else{
                   //Foto valida
                   $imagen_original_path = $imagen->getClientOriginalName();
                   $imagen_new_path = time().$imagen->hashName();
                   \Storage::disk('public')->put($imagen_new_path, \File::get($imagen));                   
                }
            }else{
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'messages' => 'Campos no validos',
                    'errores' => ['La imagen es obligatoria']
                );
                return response()->json($data,200);       
            }

            //obtener cv
            $cv=$request->file('cv',null);

            //VALIDAR CV
            if(!is_null($cv)){

               $validar=\Validator::make(["cv"=>$cv],[
                  'cv'=> 'required'
               ]);

               if($validar->fails()){
                  $data = array(
                     'status' => 'error',
                     'code' => 400,
                     'errores' => $this->errores($validar->errors()),
                     'messages' => 'Error CV',
                  );
                  return response()->json($data,200);         

               }else{
                  //CV valido
                  $cv_original_path=$cv->getClientOriginalName();
                  $cv_new_path=time().$cv->hashName();
                  \Storage::disk('public')->put($cv_new_path, \File::get($cv));
               }

            }else{
               $data = array(
                  'status' => 'error',
                  'code' => 400,
                  'messages' => 'Error CV',
                  'errores' => ['No ingresó el cv']
               );
               return response()->json($data,200);   
            }             
            
            $avisos = new Avisos();
            $avisos->sumate($nombre, $apellido, $email, $telefono, $imagen, $cv);
            $avisos->enviarAvisos();

            $data = array(
                'status' => 'success',
                'mensaje' => 'Se envio la solicitud'
            );

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
