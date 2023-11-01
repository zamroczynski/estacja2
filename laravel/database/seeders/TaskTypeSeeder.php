<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\TaskType;

class TaskTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TaskType::factory()->create([
            'name' => 'Zaplecze',
            'created_by' => 1,
            'updated_by' => 1,
        ]);
        TaskType::factory()->create([
            'name' => 'Biuro',
            'created_by' => 1,
            'updated_by' => 1,
        ]);
        TaskType::factory()->create([
            'name' => 'Podjazd',
            'created_by' => 1,
            'updated_by' => 1,
        ]);
        TaskType::factory()->create([
            'name' => 'Sklep',
            'created_by' => 1,
            'updated_by' => 1,
        ]);
    }
}
