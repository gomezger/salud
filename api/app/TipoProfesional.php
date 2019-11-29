<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoProfesional extends Model
{
     protected $table='tipo_profesional';

    public function profesional(){
        return $this->hasMany('App/Profesional');
    }
}
