<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Prority;

class ProritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Prority::factory()->create([
            'name' => 'Bardzo ważne!',
            'value' => 100,
            'created_by' => 1,
            'updated_by' => 1,
        ]);
        Prority::factory()->create([
            'name' => 'Ważne',
            'value' => 80,
            'created_by' => 1,
            'updated_by' => 1,
        ]);
        Prority::factory()->create([
            'name' => 'Normalny',
            'value' => 50,
            'created_by' => 1,
            'updated_by' => 1,
        ]);
        Prority::factory()->create([
            'name' => 'Niski',
            'value' => 30,
            'created_by' => 1,
            'updated_by' => 1,
        ]);
    }
}
