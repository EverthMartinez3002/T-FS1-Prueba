<?php

namespace Database\Seeders;

use Carbon\Carbon;
use DB;
use Illuminate\Database\Seeder;

class AlmacenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('almacenes')->insert([
            ['nombre'=>'Almacén Central','ubicacion'=>'Bodega 1, Zona Industrial','created_at'=>Carbon::now(),'updated_at'=>Carbon::now()],
            ['nombre'=>'Almacén Norte','ubicacion'=>'Pasaje Norte #45','created_at'=>Carbon::now(),'updated_at'=>Carbon::now()],
        ]);
    }
}
