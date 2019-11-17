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
        Schema::create('=profesional', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre',100);
            $table->foreing('id_tipo')
                ->references('id')->on('tipo_profesional')
                ->onDelete('cascade');
            $table->text('imagen');
            $table->text('CV');
            $table->string('email',100);
            $table->string('telefono',100);
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
        Schema::dropIfExists('=profesional');
    }
}
