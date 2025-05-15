<?php

namespace Database\Seeders;

use Carbon\Carbon;
use DB;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         DB::table('categorias')->insert([
            ['nombre' => 'Frenos', 'descripcion' => 'Componentes del sistema de frenado', 'created_at'=>Carbon::now(), 'updated_at'=>Carbon::now()],
            ['nombre' => 'Motor', 'descripcion' => 'Piezas y repuestos de motor', 'created_at'=>Carbon::now(), 'updated_at'=>Carbon::now()],
            ['nombre' => 'Eléctrico', 'descripcion' => 'Accesorios y cableado eléctrico', 'created_at'=>Carbon::now(), 'updated_at'=>Carbon::now()],
        ]);
    }
}
