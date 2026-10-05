<?php

namespace App\Console\Commands;

use Database\Seeders\CompetitionSeeder;
use Database\Seeders\PhotoSeeder;
use Illuminate\Console\Command;

class ImportSdkData extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'sdk:import {--fresh : Drop and recreate database tables before importing}';

    /**
     * The console command description.
     */
    protected $description = 'Import all 415 competitions, 1,322 results, and 2,660 photos into MySQL relational database';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info("=== SDK Zīle MySQL Relational Data Importer ===");

        if ($this->option('fresh')) {
            $this->warn("Migrating fresh tables...");
            $this->call('migrate:fresh');
        } else {
            $this->call('migrate');
        }

        $this->info("Importing competitions & results...");
        $this->call(CompetitionSeeder::class);

        $this->info("Importing photo albums & photos...");
        $this->call(PhotoSeeder::class);

        $this->info("Data import completed successfully!");
        return Command::SUCCESS;
    }
}
