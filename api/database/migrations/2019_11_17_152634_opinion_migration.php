<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class OpinionMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('opinion', function (Blueprint $table) {

            $table->increments('id');
            $table->integer('id_profesional')->unsigned()->nullable();
            $table->string('nombre',100);
            $table->string('email',100);
            $table->string('telefono',20);
            $table->longText('descripcion');
            $table->integer('aprobado')->default(0);

            $table->foreign('id_profesional')
                ->references('id')->on('profesional')
                ->onDelete('cascade');


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
        Schema::dropIfExists('opinion');
    }
}
