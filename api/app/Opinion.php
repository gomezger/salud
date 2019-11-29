<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Opinion extends Model
{
    protected $table='opinion';

    public function profesional(){
        return $this->belongTo('App/Profesional');
    }

}
