<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Product::factory()->create([
            'name' => 'Piwo Żubr puszka 0,5l',
            'created_by' => fake()->numberBetween(1, 2),
            'updated_by' => fake()->numberBetween(1, 2),
        ]);
        \App\Models\Product::factory()->create([
            'name' => 'Piwo Tyskie puszka 0,5l',
            'created_by' => fake()->numberBetween(1, 2),
            'updated_by' => fake()->numberBetween(1, 2),
        ]);
        \App\Models\Product::factory()->create([
            'name' => 'Piwo Harnaś puszka 0,5l',
            'created_by' => fake()->numberBetween(1, 2),
            'updated_by' => fake()->numberBetween(1, 2),
        ]);
        \App\Models\Product::factory()->create([
            'name' => 'Piwo Tyskie butelka 0,65l',
            'created_by' => fake()->numberBetween(1, 2),
            'updated_by' => fake()->numberBetween(1, 2),
        ]);
        \App\Models\Product::factory()->create([
            'name' => 'Baton Mars 40g',
            'created_by' => fake()->numberBetween(1, 2),
            'updated_by' => fake()->numberBetween(1, 2),
        ]);
        \App\Models\Product::factory()->create([
            'name' => 'Baton Snickers 40g',
            'created_by' => fake()->numberBetween(1, 2),
            'updated_by' => fake()->numberBetween(1, 2),
        ]);
        \App\Models\Product::factory()->create([
            'name' => 'Baton Grześki 30g',
            'created_by' => fake()->numberBetween(1, 2),
            'updated_by' => fake()->numberBetween(1, 2),
        ]);
    }
}
