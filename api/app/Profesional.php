<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profesional extends Model
{
    protected $table='profesional';

    public function tipoProfesional(){
        return $this->belongTo('App/TipoProfesional');
    }

    public function opiniones(){
        return $this->hasMany('App/Opiniones'); 
    }

}
