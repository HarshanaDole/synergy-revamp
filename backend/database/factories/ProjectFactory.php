<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => $this->faker->word,
            'imageUrl' => $this->faker->imageUrl(),
            'client_id' => Client::factory(),
            'location' => $this->faker->city,
            'year' => $this->faker->year,
            'description' => $this->faker->sentence,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
