<?php

namespace Database\Seeders;

use Carbon\Carbon;
use DB;
use Illuminate\Database\Seeder;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('productos')->insert([
            ['categoria_id'=>1,'proveedor_id'=>1,'nombre'=>'Pastilla de freno delantero','descripcion'=>'Pastilla cerámica','precio_unitario'=>19.99,'stock_actual'=>120,'stock_minimo'=>20,'fecha_vencimiento'=>NULL,'created_at'=>Carbon::now(),'updated_at'=>Carbon::now()],
            ['categoria_id'=>2,'proveedor_id'=>2,'nombre'=>'Filtro de aire motor','descripcion'=>'Filtro de motor X 2024','precio_unitario'=>12.50,'stock_actual'=>75,'stock_minimo'=>10,'fecha_vencimiento'=>'2026-12-31','created_at'=>Carbon::now(),'updated_at'=>Carbon::now()],
            ['categoria_id'=>3,'proveedor_id'=>1,'nombre'=>'Batería 12V/45Ah','descripcion'=>'Batería plomo-ácido','precio_unitario'=>85.00,'stock_actual'=>30,'stock_minimo'=>5,'fecha_vencimiento'=>'2027-06-30','created_at'=>Carbon::now(),'updated_at'=>Carbon::now()],
        ]);
    }
}
