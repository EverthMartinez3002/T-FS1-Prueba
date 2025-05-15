<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
           $table->id();
            $table->foreignId('categoria_id')
                  ->constrained('categorias')
                  ->restrictOnDelete()
                  ->cascadeOnUpdate();
            $table->foreignId('proveedor_id')
                  ->constrained('proveedores')
                  ->restrictOnDelete()
                  ->cascadeOnUpdate();
            $table->string('nombre', 150);
            $table->text('descripcion')->nullable();
            $table->decimal('precio_unitario', 10, 2)->default(0.00);
            $table->integer('stock_actual')->default(0);
            $table->integer('stock_minimo')->default(0);
            $table->date('fecha_vencimiento')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
