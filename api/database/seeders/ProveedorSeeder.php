<?php

namespace Database\Seeders;

use Carbon\Carbon;
use DB;
use Illuminate\Database\Seeder;

class ProveedorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       DB::table('proveedores')->insert([
            ['nombre'=>'AutoRepuestos S.A.', 'contacto'=>'María Pérez','telefono'=>'+50312345678','email'=>'ventas@autorepuestos.com','direccion'=>'Av. Principal #123','created_at'=>Carbon::now(),'updated_at'=>Carbon::now()],
            ['nombre'=>'MotoParts Ltda.','contacto'=>'Juan López','telefono'=>'+50387654321','email'=>'info@motoparts.com','direccion'=>'Col. Centro','created_at'=>Carbon::now(),'updated_at'=>Carbon::now()],
        ]);
    }
}
