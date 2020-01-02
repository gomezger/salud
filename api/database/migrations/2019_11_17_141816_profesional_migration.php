<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ProfesionalMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profesional', function (Blueprint $table) {

            $table->increments('id');
            $table->integer('id_tipo')->nullable()->unsigned();
            $table->string('nombre',100);
            $table->text('imagen');
            $table->text('CV');
            $table->string('email',100);
            $table->string('telefono',100);               
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
        Schema::dropIfExists('profesional');
    }
}
