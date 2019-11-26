<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
    /**
    * Recibe un arreglo de errores de Validator y lo convierte a un arreglo para el fronend
    */
   protected function errores($arreglo_validator){
       $arreglo = json_decode(json_encode($arreglo_validator), true);
       $errores = array();

       // recorro el arreglo que me da arreglos de errores por categoria, por ejemplo:
       // un arreglo tiene 2 errores de titulo, otro un arreglo que tiene un error de bajada, etc
       foreach($arreglo as $error_por_tipo){

           // recorro los errores de una categoria, como titulo. Extraigo el error y lo pongo en un arrreglo general de errores
           foreach($error_por_tipo as $error){
               array_push($errores, $error);
           }
       }

       return $errores;
   }

}
