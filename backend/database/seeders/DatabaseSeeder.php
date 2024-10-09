<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Client;
use App\Models\Project;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'username' => 'Haru',
            'password' => bcrypt('123456')
        ]);

        $clients = Client::factory(20)->create();

        // Create projects with associated client_id
        Project::factory(10)->create([
            'client_id' => $clients->random()->id, // Assign a random client_id from the created clients
        ]);
    }
}
