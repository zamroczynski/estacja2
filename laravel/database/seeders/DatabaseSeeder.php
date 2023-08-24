<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Enums\UserRole;

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
            'role' => UserRole::ADMIN
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Magda Gołembiewska',
            'email' => 'magda@test.pl',
            'role' => UserRole::NEW_ADMIN
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Jan Testowy',
            'email' => 'jan@test.pl',
            'role' => UserRole::USER
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Maciek Nowy',
            'email' => 'maciek@test.pl',
            'role' => UserRole::NEW_USER
        ]);
        \App\Models\User::factory()->create([
            'name' => 'Basia Stara',
            'email' => 'basia@test.pl',
            'role' => UserRole::OLD_USER
        ]);

        $this->call([
            ProductSeeder::class,
            ExpiryDateSeeder::class,
            ProritySeeder::class,
        ]);
    }
}
