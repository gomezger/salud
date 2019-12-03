<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Profesional; 
use App\TipoProfesional;
use App\Opinion;
use App\Helpers\JwtAuth;

class ProfesionalController extends Controller{

   public function insertProfesional(Request $request){
      $hash = $request->header('Authorization',null);
      $jwtAuth = new JwtAuth();
      $checkToken = $jwtAuth->checkToken($hash);

      if($checkToken){
         //Recoger POST
         $json = $request->input('json',null);
         $params = json_decode($json);
         $params_array = json_decode($json,true);

         //Validacion 
         $nombre=(!is_null($json) && isset($params->nombre)) ? $params->nombre : null;
         $tipo_profesional=(!is_null($json) && isset($params->tipo_profesional)) ? $params->tipo_profesional : null;
         $email=(!is_null($json) && isset($params->email)) ? $params->email : null;
         $telefono=(!is_null($json) && isset($params->telefono)) ? $params->telefono : null;
         

         //Reglas de validacion
         $validar= \Validator::make($params_array,[
                  'nombre' => 'required',
                  'tipo_profesional'=> 'required',
                  'email'=> 'required'
         ]);

         //si hay errores envio el error
         if($validar->fails()){
            
            $data = array(
               'status' => 'error',
               'code' => 400,
               'messages' => 'Campos no validos',
            );
            return response()->json($data,200);         
          }

          $imagen= $request->file('imagen',null);
          $imagenes = ["imagen"=>$imagen];

          $validar=\Validator::make([$imagenes,
               'imagen'=> 'mimes:jpeg,gif,png|required'
          ]);
         
          if($validar->fails()){
            $data = array(
               'status' => 'error',
               'code' => 400,
               'messages' => 'Campos no validos',
            );
            return response()->json($data,200);         
          }else{
             //Foto valida
             $imagen_original_path = $imagen->getClientOriginalName();
             $imagen_new_path = time().$imagen->hashName();
             \Storage::disk('public')->put($imagen_new_path, \File::get($imagen));
          }

          $cv=$request->file('cv',null);
          //VALIDAR CV
          $cvs = ["cv"=>$cv];
          $validar=\Validator::make([$cvs,
            'cv'=> 'required'
          ]);

          if($validar){
            $data = array(
               'status' => 'error',
               'code' => 400,
               'messages' => 'Error CV',
            );
            return response()->json($data,200);         

          }else{
             //CV valido
             $cv_original_path=$cv->getClientOriginalName();
             $cv_new_path=time().$cv->hashName();
             \Storage::disk('public')->put($cv_new_path, \File::get($cv));
          }

          
          $profesional=new Profesional;

          $profesional->nombre=$nombre;
          $profesional->tipo_profesional=$tipo_profesional;
          $profesional->email=$email;
          $profesional->telefono=$telefono;
          $profesional->imagen=$imagen_new_path;
          $profesional->cv=$cv_new_path;

          $profesional->save();
          $profesional->load('tipo_profesional','opinion');

          $data = array(
            'status' => 'success',
            'profesional' => $profesional,
            'code' => 200,
            'message' => array('Se agregó el nuevo profesional')
         );
         return response()->json($data,200);

      }else{
         $data = array(
            'status' => 'error',
            'code' => 400,
            'messages' => 'Fallo autentificacion',
         );
         return response()->json($data,200);         
      } 
   }

   public function getProfesional(){
      $profesionales= Profesional::orderBy('id','desc')->get()->load('tipo_profesional','opinion');
      return response()->json(array(
         'profesionales'=>$profesionales,
         'status'=>'success'
      ),200);
   }

   public function getProfesionalById($id){
      $profesional = Profesional::where([['id', '=', $id]])->get()->first();

      if(!is_null($profesional)){
         $profesional->load('tipo_profesional','opinion');
         return response()->json(array(
            'profesional'=>$profesional,
            'status'=>'success'
         ),200);

      }else{
         //El profesional con ese id no existe
         
			return response()->json(array(
				'message' => 'El profesional no existe.',
				'status' => 'error'
			), 200);
      }
   }

}
