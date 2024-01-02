<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Shift;

class ShiftSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Shift::factory()->create([
            'name' => 'Dniówka 12h',
            'time_start' => '07:00:00',
            'time_stop' => '19:00:00',
            'hours' => 12,
            'minutes' => 0,
            'created_by' => 1,
            'updated_by' => 1,
        ]);
        Shift::factory()->create([
            'name' => 'Nocka 12h',
            'time_start' => '19:00:00',
            'time_stop' => '07:00:00',
            'hours' => 12,
            'minutes' => 0,
            'created_by' => 1,
            'updated_by' => 1,
        ]);
        Shift::factory()->create([
            'name' => 'Dniówka 8h',
            'time_start' => '12:00:00',
            'time_stop' => '20:00:00',
            'hours' => 8,
            'minutes' => 0,
            'created_by' => 1,
            'updated_by' => 1,
        ]);
        Shift::factory()->create([
            'name' => 'Podjazd 8h',
            'time_start' => '11:00:00',
            'time_stop' => '19:00:00',
            'hours' => 8,
            'minutes' => 0,
            'created_by' => 1,
            'updated_by' => 1,
        ]);
    }
}
