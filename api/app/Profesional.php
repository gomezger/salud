<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\TipoProfesional;
use App\Opinion;

class Profesional extends Model
{
    protected $table='profesional';

    public function tipo_profesional(){
        return $this->HasOne('App\TipoProfesional','id','id_tipo');
    }

    public function opiniones(){
        return $this->hasMany('App\Opinion','id_profesional','id'); 
    }

}
