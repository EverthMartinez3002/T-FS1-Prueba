<?php

namespace Database\Seeders;

use Carbon\Carbon;
use DB;
use Illuminate\Database\Seeder;

class MovimientoStockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         DB::table('movimientos_stock')->insert([
            ['producto_id'=>1,'almacen_id'=>1,'cantidad'=>50,'tipo'=>'entrada','motivo'=>'Lote inicial','created_at'=>Carbon::now(),'updated_at'=>Carbon::now()],
            ['producto_id'=>2,'almacen_id'=>1,'cantidad'=>-10,'tipo'=>'salida','motivo'=>'Venta #1234','created_at'=>Carbon::now(),'updated_at'=>Carbon::now()],
            ['producto_id'=>3,'almacen_id'=>2,'cantidad'=>20,'tipo'=>'entrada','motivo'=>'Reposición','created_at'=>Carbon::now(),'updated_at'=>Carbon::now()],
            ['producto_id'=>1,'almacen_id'=>2,'cantidad'=>-15,'tipo'=>'salida','motivo'=>'Venta #1235','created_at'=>Carbon::now(),'updated_at'=>Carbon::now()],
            ['producto_id'=>3,'almacen_id'=>1,'cantidad'=>-5,'tipo'=>'ajuste','motivo'=>'Ajuste físico','created_at'=>Carbon::now(),'updated_at'=>Carbon::now()],
        ]);
    }
}
