<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Profesional; 
use App\TipoProfesional;
use App\Opinion;
use App\Helpers\JwtAuth;

class ProfesionalController extends Controller{

   public function insertProfesional(Request $request){
      $hash = $request->input('Authorization',null);
      $jwtAuth = new JwtAuth();
      $checkToken = $jwtAuth->checkToken($hash);

      if($checkToken){
         //Recoger POST
         $json = $request->input('json',null);
         $params = json_decode($json);
         $params_array = json_decode($json,true);

         //Validacion 
         $nombre=(!is_null($json) && isset($params->nombre)) ? $params->nombre : null;
         $id_tipo=(!is_null($json) && isset($params->id_tipo)) ? $params->id_tipo : null;
         $email=(!is_null($json) && isset($params->email)) ? $params->email : null;
         $telefono=(!is_null($json) && isset($params->telefono)) ? $params->telefono : null;
         

         //chequeamos que tengamos datos por POST
         if(!is_null($params_array)){

             //Reglas de validacion
            $validar= \Validator::make($params_array,[
               'nombre' => 'required',
               'id_tipo'=> 'required',
               'email'=> 'required|email',
               'telefono' => 'required'
            ]);

            //si hay errores envio el error
            if($validar->fails()){
               
               $data = array(
                  'status' => 'error',
                  'code' => 400,
                  'errores' => $this->errores($validar->errors()),
                  'messages' => 'Campos no validos',
               );

               return response()->json($data,200);  

            }

            // verificar que existe el tipo de profesional
            $tipo_profesional = TipoProfesional::find($id_tipo);
            if(is_null($tipo_profesional)){

               $data = array(
                  'status' => 'error',
                  'code' => 400,
                  'errores' => ['El tipo de profesional no existe'],
                  'messages' => 'No existe el tipo de profesional ingresado',
               );
               return response()->json($data,200);  
            }


            //subir imagen
            $imagen= $request->file('imagen',null);

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
            
            //crear modelo
            $profesional=new Profesional;

            $profesional->nombre=$nombre;
            $profesional->id_tipo=$tipo_profesional->id;
            $profesional->email=$email;
            $profesional->telefono=$telefono;
            $profesional->imagen=$imagen_new_path;
            $profesional->cv=$cv_new_path;

            $profesional->save();
            $profesional->load('opiniones');

            $data = array(
               'status' => 'success',
               'profesional' => $profesional,
               'code' => 200,
               'message' => 'Se agregó el nuevo profesional'
            );
            return response()->json($data,200);           

         }else{
            $data = array(
               'status' => 'error',
               'code' => 400,
               'errores' => ['No hay datos por POST'],
            );
            return response()->json($data,200); 
         }
        
      }else{
         $data = array(
            'status' => 'error',
            'code' => 400,
            'errores' => ['No iniciaste sesión'],
         );
         return response()->json($data,200);         
      } 
   }

   public function getProfesionales(){
      $profesionales= Profesional::orderBy('id','desc')->get()->load('tipo_profesional','opiniones');
      
      
      
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

   public function updateProfesional($id, Request $request){
      $hash = $request->header('Authorization',null);
      $jwtAuth = new JwtAuth();
      $checkToken = $jwtAuth->checkToken($hash);

      if($checkToken){
         //El toquen es valido
        
         //Recoger POST
         $json = $request->input('json',null);
         $params = json_decode($json);
         $params_array = json_decode($json,true);

         //Validacion 
         $nombre=(!is_null($json) && isset($params->nombre)) ? $params->nombre : null;
         $tipo_profesional=(!is_null($json) && isset($params->tipo_profesional)) ? $params->tipo_profesional : null;
         $email=(!is_null($json) && isset($params->email)) ? $params->email : null;
         $telefono=(!is_null($json) && isset($params->telefono)) ? $params->telefono : null;

         //Control de que haya datos por post
         if(!is_null($params_array)){
            
            //Validar atributos
            $validar= \Validator::make($params_array,[
               'nombre' => 'required',
               'tipo_profesional'=> 'required',
               'email'=> 'required|email',
               'telefono' => 'required'
            ]);

            //Chequeo si hay errores al validar
            if($validar->fails()){
               
               $data = array(
                  'status' => 'error',
                  'code' => 400,
                  'errores' => $this->errores($validar->errors()),
                  'messages' => 'Campos no validos',
               );
               return response()->json($data,200);  
            }

            //Verificar que existe el tipo de profesional
            $tipo_profesional = TipoProfesional::find($tipo_profesional);
            if(is_null($tipo_profesional)){
               $data = array(
                  'status' => 'error',
                  'code' => 400,
                  'errores' => ['El tipo de profesional no existe'],
                  'messages' => 'No existe el tipo de profesional ingresado',
               );
               return response()->json($data,200);  
            }

            //Recupero la imagen
            $imagen=$request->file('imagen',null);
            //Verificar imagen
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
                  //Imagen valida
                  $imagen_original_path = $imagen->getClientOriginalName();
                  $imagen_new_path = time().$imagen->hashName();
                  \Storage::disk('public')->put($imagen_new_path, \File::get($imagen));            
               }
            }
            else{
               $data = array(
                  'status' => 'error',
                  'code' => 400,
                  'messages' => 'Campos no validos',
                  'errores' => ['La imagen es obligatoria']
               );
               return response()->json($data,200);  
            }
            
            //Recupero el cv
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
            
            //Actualizacion
            $profesional = Profesional::find($id);

            //Si existe el profesional
            if(!isnull($profesional)){
               $profesional->nombre=$nombre;
               $profesional->id_tipo=$tipo_profesional->id;
               $profesional->email=$email;
               $profesional->telefono=$telefono;
               $profesional->imagen=$imagen_new_path;
               $profesional->cv=$cv_new_path;
               $profesional->save();
               $data = array(
                  'status' => 'success',
                  'profesional' => $profesional,
                  'code' => 200,
                  'message' => 'Se agregó el nuevo profesional'
               );
               return response()->json($data,200);     

            }else{
               //No existe el profesional
               $data = array(
                  'status' => 'error',
                  'errores' => ['No existe el profesional'],
                  'message' => 'Error al subir el profesional'
              );

            }
            

         }else{
            //El POST es nulo, o no hay informacion 
            $data = array(
               'status' => 'error',
               'errores' => ['No hay datos por POST'],
               'message' => 'Error al subir el profesional'
           );
         }

      }else{
         $data = array(
            'status' => 'error',
            'errores' => ['No inició sesión'],
            'message' => 'Error al subir el profesional'
          );
      }
      return $data;
   }

   public function deleteProfesional($id, Request $request){
      $hash = $request->header('Authorization',null);
      $jwtAuth = new JwtAuth();
      $checkToken = $jwtAuth->checkToken($hash);

      
        //verificar si es un token valido
        if($checkToken){
         //buscar profesional
         $profesional = Profesional::find($id);
         //si existe el tipo
         if(!is_null($profesional)){
             //cargamos profesionales
             $profesional = $profesional->load('opiniones');
             // chequeamos que no tenga profesionales
             if(count($profesional->opiniones)==0){
                 // guardar tipo
                 $profesional->delete();
                 // mensaje de retorno
                 $data = array(
                     'status' => 'success',
                     'profesional' => $profesional,
                     'code' => 200,
                     'message' => 'Se eliminó el profesional'
                 );
             }else{
                 // mensaje de retorno
                 $data = array(
                     'status' => 'error',
                     'errores' => ['No se puede eliminar si hay profesionales asociados con opiniones'],
                     'message' => 'Error al eliminar el profesional'
                 );
             }                
         }else{
             // mensaje de retorno
             $data = array(
                 'status' => 'error',
                 'errores' => ['No existe el profesional'],
                 'message' => 'Error al eliminar el profesional'
             );
         }
     }else{
         $data = array(
           'status' => 'error',
           'errores' => ['No inició sesión'],
           'message' => 'Error al eliminar el profesional'
         );
     }
       
     return $data;

   }
}
