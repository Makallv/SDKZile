<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Default Admin User
        User::firstOrCreate(
            ['email' => 'admin@sdk-zile.lv'],
            [
                'name' => 'SDK Zīle Administrācija',
                'password' => Hash::make('Zile1995!Secure'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Seed Competitions & Relational Results
        $this->call(CompetitionSeeder::class);

        // 3. Seed Albums & Photos
        $this->call(PhotoSeeder::class);
    }
}
