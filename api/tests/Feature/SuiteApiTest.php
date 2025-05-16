<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SuiteApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_acceso_no_autenticado_retorna_401()
    {
        $this->getJson('/api/v1/categorias')
             ->assertStatus(401);
    }

    public function test_usuario_autenticado_puede_listar_categorias()
    {
        Sanctum::actingAs(User::factory()->create(), ['*']);

        $this->getJson('/api/v1/categorias')
             ->assertStatus(200)
             ->assertJsonStructure([ '*' => ['id','nombre','descripcion'] ]);
    }

    public function test_usuario_autenticado_puede_crear_categoria()
    {
        Sanctum::actingAs(User::factory()->create(), ['*']);

        $payload = ['nombre' => 'Prueba', 'descripcion' => 'Desc'];
        $this->postJson('/api/v1/categorias', $payload)
             ->assertStatus(201)
             ->assertJsonFragment(['nombre' => 'Prueba']);
    }

    public function test_login_con_credenciales_validas_retorna_token()
    {
        $user = User::factory()->create([
            'email'    => 'test@example.com',
            'password' => Hash::make('secret123'),
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email'    => 'test@example.com',
            'password' => 'secret123',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['user' => ['id','name','email'], 'token']);
    }

    public function test_login_con_credenciales_invalidas_retorna_401()
    {
        User::factory()->create([
            'email'    => 'test@example.com',
            'password' => Hash::make('secret123'),
        ]);

        $this->postJson('/api/v1/auth/login', [
            'email'    => 'test@example.com',
            'password' => 'wrongpass',
        ])->assertStatus(401)
          ->assertJson(['message' => 'Credenciales incorrectas']);
    }
}
