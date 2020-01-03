<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAvisos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('avisos', function (Blueprint $table) {
			$table->engine = 'InnoDB';	
			$table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';			
            
            $table->bigIncrements('id');
            $table->text('destinatario');
            $table->text('asunto');
            $table->text('mensaje');
            $table->text('emisor');
            $table->text('emisor_nombre')->nullable(true);
            $table->text('adjunto')->nullable(true);
            $table->boolean('enviado')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('avisos');
    }
}
