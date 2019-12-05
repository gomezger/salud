<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\TipoProfesional;
use App\Profesional;
use App\Helpers\JwtAuth;

class TipoProfesionalController extends Controller
{
    /**
     * Retorna todos los tipos de profesionales
     */
    public function getTipoProfesionales(){
        // Buscamos los tipo de profesionales
        $tipos = TipoProfesional::all();

        // Verificar si no es nulo
        if(!is_null($tipos)){        
            $tipos->load('profesionales');
        }

        $data = array(
            'status' => 'success',
            'tipos_profesionales' => $tipos,
            'code' => 200
        );

        return $data;
    }


    /**
     * Agregar un tipo de profesional
     */
    public function insert(Request $request){        
      $hash = $request->header('Authorization',null);
      $jwtAuth = new JwtAuth();
      $checkToken = $jwtAuth->checkToken($hash);

      //verificar si es un token valido
      if($checkToken){

        //Recoger POST
        $json = $request->input('json',null);
        $params = json_decode($json);
        $params_array = json_decode($json,true);

        //verificamos que tengamos datos por post
        if(!is_null($params_array)){

            //Validacion 
            $nombre = (!is_null($json) && isset($params->nombre)) ? $params->nombre : null;

            //Reglas de validacion
            $validar= \Validator::make($params_array,[
                'nombre' => 'required'
            ]);

            // si hay errores envio el error
            if($validar->fails()){ 
                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'errores' => $this->errores($validar->errors()),
                    'messages' => 'Campos no validos',
                );
            }else{
                
                // crear tipo
                $tipo = new TipoProfesional();
                $tipo->nombre = $nombre;

                // guardar tipo
                $tipo->save();

                // mensaje de retorno
                $data = array(
                    'status' => 'success',
                    'tipo_profesional' => $tipo,
                    'code' => 200,
                    'message' => 'Se agregó el nuevo tipo de profesional'
                );
            }
        }else{
            $data = array(
                'status' => 'error',
                'errores' => ['No hay datos por POST'],
                'message' => 'Error al subir tipo de profesional'
            );
        }

      }else{
          $data = array(
            'status' => 'error',
            'errores' => ['No inició sesión'],
            'message' => 'Error al subir tipo de profesional'
          );
      }
        
      return $data;
    }

    /**
     * Editar un tipo de profesional
     */
    public function update($id, Request $request){        
        $hash = $request->header('Authorization',null);
        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);
  
        //verificar si es un token valido
        if($checkToken){
  
          //Recoger POST
          $json = $request->input('json',null);
          $params = json_decode($json);
          $params_array = json_decode($json,true);
  
          //verificamos que tengamos datos por post
          if(!is_null($params_array)){
  
              //Validacion 
              $nombre = (!is_null($json) && isset($params->nombre)) ? $params->nombre : null;
  
              //Reglas de validacion
              $validar= \Validator::make($params_array,[
                  'nombre' => 'required'
              ]);
  
              // si hay errores envio el error
              if($validar->fails()){ 
                  $data = array(
                      'status' => 'error',
                      'code' => 400,
                      'errores' => $this->errores($validar->errors()),
                      'messages' => 'Campos no validos',
                  );
              }else{
                  
                  // crear tipo
                  $tipo = TipoProfesional::find($id);

                  //si existe el tipo
                  if(!is_null($tipo)){
                    $tipo->nombre = $nombre;
    
                    // guardar tipo
                    $tipo->save();
    
                    // mensaje de retorno
                    $data = array(
                        'status' => 'success',
                        'tipo_profesional' => $tipo,
                        'code' => 200,
                        'message' => 'Se agregó el nuevo tipo de profesional'
                    );

                  }else{
                    // mensaje de retorno
                    $data = array(
                        'status' => 'error',
                        'errores' => ['No existe el tipo de profesional'],
                        'message' => 'Error al subir tipo de profesional'
                    );

                  }
              }
          }else{
              $data = array(
                  'status' => 'error',
                  'errores' => ['No hay datos por POST'],
                  'message' => 'Error al subir tipo de profesional'
              );
          }
  
        }else{
            $data = array(
              'status' => 'error',
              'errores' => ['No inició sesión'],
              'message' => 'Error al subir tipo de profesional'
            );
        }
          
        return $data;
    }

    /**
     * Eliminar un tipo de profesional
     */
    public function delete($id, Request $request){        
        $hash = $request->header('Authorization',null);
        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);
  
        //verificar si es un token valido
        if($checkToken){
                    
            // crear tipo
            $tipo = TipoProfesional::find($id);

            //si existe el tipo
            if(!is_null($tipo)){

                //cargamos profesionales
                $tipo = $tipo->load('profesionales');

                // chequeamos que no tenga profesionales
                if(count($tipo->profesionales)==0){
                    // guardar tipo
                    $tipo->delete();

                    // mensaje de retorno
                    $data = array(
                        'status' => 'success',
                        'tipo_profesional' => $tipo,
                        'code' => 200,
                        'message' => 'Se eliminó el nuevo tipo de profesional'
                    );
                }else{
                    // mensaje de retorno
                    $data = array(
                        'status' => 'error',
                        'errores' => ['No se puede eliminar si hay profesionales asociados a ese tipo de profesional'],
                        'message' => 'Error al eliminar tipo de profesional'
                    );
                }                

            }else{
                // mensaje de retorno
                $data = array(
                    'status' => 'error',
                    'errores' => ['No existe el tipo de profesional'],
                    'message' => 'Error al subir tipo de profesional'
                );
            }

        }else{
            $data = array(
              'status' => 'error',
              'errores' => ['No inició sesión'],
              'message' => 'Error al subir tipo de profesional'
            );
        }
          
        return $data;
    }




}
