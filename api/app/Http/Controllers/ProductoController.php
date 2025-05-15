<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Validator;

class ProductoController extends Controller
{
    public function index()
    {
        $productos = Producto::with(['categoria', 'proveedor'])->get();
        return response()->json($productos);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre'=>'required|string|max:150',
            'descripcion'=>'nullable|string',
            'precio_unitario'=>'required|numeric|min:0',
            'categoria_id'=>'required|exists:categorias,id',
            'proveedor_id'=>'required|exists:proveedores,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $validator->validated();
        $producto = Producto::create($data);

        return response()->json(['message' => 'Producto creado con éxito', 'data' => $producto], 201);
    }

    public function show($id)
    {
        $producto = Producto::with(['categoria', 'proveedor'])->find($id);

        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        return response()->json($producto);
    }

    public function update(Request $request, $id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

         $validator = Validator::make($request->all(), [
            'nombre'=>'required|string|max:150',
            'descripcion'=>'nullable|string',
            'precio_unitario'=>'required|numeric|min:0',
            'categoria_id'=>'required|exists:categorias,id',
            'proveedor_id'=>'required|exists:proveedores,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $validator->validated();

        $producto->update($data);

        return response()->json(['message' => 'Producto actualizado con éxito']);
    }
    
    public function destroy($id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        $producto->delete();

        return response()->json(['message' => 'Producto eliminado con éxito']);
    }
}
