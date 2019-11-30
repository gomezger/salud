<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        //agrego info del negocio
		$cond = [
            'nombre' => 'Cuidar Salud',
            'email' => 'germang08@hotmail.com',
            'telefono' => '2915279200',
            'created_at' => now(),
            'updated_at' => now()
        ];

        $db = DB::table('informacion')->insert($cond);
        

        //agregar usuarios
		$cond = [
            'name' => 'Germán',
            'email' => 'germang08@hotmail.com',
            'password' => '5497f66fd73a492c9cd560585eae772b6447726f0ad5fb127139e489d0b2009d',
            'created_at' => now(),
            'updated_at' => now()
        ];
        $db = DB::table('users')->insert($cond);

        //agregar usuarios
		$cond = [
            'name' => 'Matías',
            'email' => 'mati.luciano.garcia@gmail.com',
            'password' => '5497f66fd73a492c9cd560585eae772b6447726f0ad5fb127139e489d0b2009d',
            'created_at' => now(),
            'updated_at' => now()
        ];
        $db = DB::table('users')->insert($cond);
    }
}
