<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExpiryDate>
 */
class ExpiryDateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'date' => fake()->dateTimeThisYear(),
            'product_id' => fake()->numberBetween(1, 7),
            'amount' => fake()->numberBetween(1, 20),
            'created_by' => fake()->numberBetween(1, 2),
            'updated_by' => fake()->numberBetween(1, 2),
        ];
    }
}
