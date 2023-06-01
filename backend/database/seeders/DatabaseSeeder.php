<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Damian Zamroczynski',
            'email' => 'damian@test.pl',
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Magda Gołembiewska',
            'email' => 'magda@test.pl',
        ]);
    }
}
