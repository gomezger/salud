<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TipoProfesionalMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipo_profesional', function (Blueprint $table) {

            $table->increments('id');
            $table->string('nombre',100);
            $table->timestamps();
            
			$table->engine = 'InnoDB';	
			$table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';			
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tipo_profesional');
    }
}
