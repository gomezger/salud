<?php
namespace App\Helpers;

use Firebase\JWT\JWT;
use Illuminate\Support\Facades\BD;
use App\User;

class JwtAuth{

    public $key;

    public function __construct(){
        $this->key = 'la_clave_mas_dificil es esta $%%$ 54646 123 clave';
    }

    /**
     * Retorno los datos del usuario logueado
     */
    public function getToken($correo, $clave){
        $data = $this->login($correo, $clave);

        // si es un string, es porque existe el usuario y lo decodifico
        if(is_string($data)){
            return JWT::decode($data,$this->key,['HS256']);

        // no existe el usuario
        }else{
            return $data;
        }
    }

    /**
     * Si devuelve un string (token) si existe el usuario
     */
    public function login($email, $password){
        // buscar si existe el usuario con sus credenciales
        $usuario = User::where([
                    'email' => $email,
                    'password' => $password
                ])->first();

        //Comprobar si son correctos (objetos) 
        //generar Token con los datos del usuario idetificado
        if(is_object($usuario)){
            $token = array(
                'sub' => $usuario->id,
                'name' => $usuario->name,
                'email' => $usuario->email,
                'iat' => time(),
                'exp' => time() + (7 * 24 * 60 * 60) //dura una semana (semana*dia*minutos*segundos)
            );

            $data = JWT::encode($token, $this->key, 'HS256');

        }else{

            $data = array(
                'status' => 'error',
                'errores' => ['El usuario o contraseña incorrecto']
            );

        }

        return $data;        
    }

    /**
	 * Verifico si el token es valido
	 * $token, token de sesion
	 */
	public function checkToken($token){
		try{
            //decodifico
            $decoded = JWT::decode($token, $this->key, array('HS256'));

            //si es un objeto: es token valido
            if(is_object($decoded))
                return true;
            else
                return false;            

		}catch(\UnexpectedValueException $e){
            return false;
		}catch(\DomainException $e){
			echo $e->getMessage();
            return false;
		}
	}

    /**
	 * Devuelvo datos del token
	 * $token, token de sesion
	 */
	public function getIdentity($token){
		try{
            //decodifico
            $decoded = JWT::decode($token, $this->key, array('HS256'));

            //si es un objeto: es token valido
            if(is_object($decoded))
                return $decoded;
            else
                return null;            

		}catch(\UnexpectedValueException $e){
            return null;
		}catch(\DomainException $e){
			echo $e->getMessage();
            return null;
		}
    }
}

