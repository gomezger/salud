<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Informacion;

class InformacionController extends Controller
{
    public function getInformacion(){
        // obtengo la info del negocio 
        $info = Informacion::first();

        if(is_object($info)){
            $data = array(
                'status' => 'success',
                'informacion' => $info
            );
        }else{
            $data = array(
                'status' => 'error',
                'errores' => ['No existe información']
            );
        }

        return $data;
    }
}
