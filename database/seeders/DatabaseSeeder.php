<?php

namespace Database\Seeders;

use App\Models\User;
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

        User::factory()->createMany([
            [
                'name' => 'Ken',
                'email' => 'deken0923@gmail.com',
                'password' => bcrypt('password'),
                'role' => '2',
            ],
            [
                'name' => 'Woon',
                'email' => 'woon@gmail.com',
                'password' => bcrypt('password'),
                'role' => '3',
            ],
        ]);
    }
}
