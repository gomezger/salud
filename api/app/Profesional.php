<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profesional extends Model
{
    protected $table='profesional';

    public function tipo(){
        return $this->hasMany('App/TipoProfesional');
    }


}
