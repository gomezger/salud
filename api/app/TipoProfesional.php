<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoProfesional extends Model
{
    protected $table='tipo_profesional';

    public function profesionales(){
        return $this->HasMany('App\Profesional','id_tipo','id');
    }
}
