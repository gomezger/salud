<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Profesional;

class Opinion extends Model
{
    protected $table='opinion';

    public function profesional(){
        return $this->belongTo('App\Profesional');
    }

}
