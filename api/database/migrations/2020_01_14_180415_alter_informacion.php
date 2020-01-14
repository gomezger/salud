<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterInformacion extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {        
        Schema::table('informacion', function (Blueprint $table) {
            $table->mediumText('facebook_url')->nullable();
            $table->mediumText('instagram_url')->nullable();
            $table->mediumText('facebook_name')->nullable();
            $table->mediumText('instagram_name')->nullable();
            $table->mediumText('telefono2')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
