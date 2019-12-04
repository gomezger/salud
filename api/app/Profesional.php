<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profesional extends Model
{
    protected $table='profesional';

    public function tipo_profesional(){
        return $this->belongTo('App\TipoProfesional');
    }

    public function opiniones(){
        return $this->hasMany('App\Opinion','id_profesional','id'); 
    }

}
