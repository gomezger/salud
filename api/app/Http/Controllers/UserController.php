<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\User;

class UserController extends Controller
{
    /**
     * Registrar un usuario
     */
    public function register(Request $request){

        //obtengo token
		$hash = $request->header('Authorization',null);
		$jwtAuth = new JwtAuth();
		$checkToken = $jwtAuth->checkToken($hash);		
        
        //valido si el token es valido
		if($checkToken){

            //Recoger POST
            $json = $request->input('json',null);
            $params = json_decode($json);
            $params_array = json_decode($json,true);
            
            //guardamos las variables
            $name = (!is_null($json) && isset($params->name)) ? $params->name : null;
            $email =(!is_null($json) && isset($params->email)) ? $params->email : null;
            $password = (!is_null($json) && isset($params->password)) ? $params->password : null; 
            $password2 = (!is_null($json) && isset($params->password2)) ? $params->password2 : null; 
            
            // verificar las claves
            if(!is_null($password) && $password==$password2){

                //si existen datos: validamos datos
                if(!is_null($params_array)){
                    //validar datos
                    $validate = \Validator::make( $params_array, [
                        'email' => 'required|email|max:45',
                        'name' => 'required',
                        'password' => 'required|min:8|max:20'        
                    ]);

                    if(!$validate->fails()){

                        // crear el usuario
                        $usuario = new User();
                        $usuario->email = $email;
                        $usuario->name = $name;
                        $usuario->password = hash('sha256',$password);

                        //verificar que no esté utilizado ese correo
                        $aux = User::where(['email' => $email])->first();

                        //no hay un usuario duplicado: creo el usuario
                        if(!is_object($aux)){
                            
                            $usuario->save();

                            $data = array(
                                'status' => 'success',
                                'code' => 200,
                                'usuario' => $usuario
                            );

                        //el correo ya esta registrado    
                        }else{
                            $data = array(
                                'status' => 'error',
                                'errores' => ['El correo ya está registrado'],
                                'code' => '404'
                            );
                        }

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

            // las claves no coinciden   
            }else{
                $data = array(
                    'status' => 'error',
                    'code' => 404,
                    'errores' => ['Las contraseñas no coinciden']
                );
            }
        }else{
            $data = array(
                'status' => 'error',
                'code' => 404,
                'errores' => ['No inició sesión']
            );
        }

		//envio info de operacion
		return response()->json($data,200);
    }

    /**
     * Devuelve el token del usuario logueado
     */
    public function login(Request $request){
       
        $jwtAuth = new \JwtAuth();

        //obtener datos de post
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json,true);

        if(!is_null($params_array)){
            //validar datos
            $validate = \Validator::make( $params_array, [
                'email' => 'required|email',
                'password' => 'required'            
            ]);

            if($validate->fails()){
                $data = array(
                    'status' => 'error',
                    'code' => '404',
                    'errores' =>  $this->errores($validate->errors()),
                    'mensaje' => 'No se inició sesión'
                );

                return $data;

            }else{

                // cifrar pass
                $password = hash('sha256', $params->password);
                $token = $jwtAuth->login($params->email,$password);

                return response()->json($token,200);
            }


        }else{

            $data = array(
                'status' => 'error',
                'errores' => ['No hay datos por POST']
            );

            return $data;
        }
    }

    /**
     * Devuelve el token del usuario logueado
     */
    public function info(Request $request){
       
        $jwtAuth = new \JwtAuth();

        //obtener datos de post
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json,true);

        if(!is_null($params_array)){
            //validar datos
            $validate = \Validator::make( $params_array, [
                'email' => 'required|email',
                'password' => 'required'            
            ]);

            if($validate->fails()){
                $data = array(
                    'status' => 'error',
                    'code' => '404',
                    'errores' =>  $this->errores($validate->errors()),
                    'mensaje' => 'No se inició sesión'
                );

                return $data;

            }else{

                // cifrar pass
                $password = hash('sha256', $params->password);
                $token = $jwtAuth->getToken($params->email,$password);

                return response()->json($token,200);
            }


        }else{

            $data = array(
                'status' => 'error',
                'errores' => ['No hay datos por POST']
            );

            return $data;
        }
    }
}
