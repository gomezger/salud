<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Profesional;

class Opinion extends Model
{
    protected $table='opinion';

    public function profesional(){
        return $this->HasOne('App\Profesional','id','id_profesional');
    }

}
