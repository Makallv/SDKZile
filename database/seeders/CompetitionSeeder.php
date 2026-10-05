<?php

namespace Database\Seeders;

use App\Models\Competition;
use App\Models\CompetitionResult;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class CompetitionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonPath = base_path('server/data/competitions.json');
        if (!File::exists($jsonPath)) {
            $this->command?->warn("Competitions JSON not found at: {$jsonPath}");
            return;
        }

        $competitions = json_decode(File::get($jsonPath), true);
        if (!is_array($competitions)) {
            $this->command?->error("Invalid competitions JSON data.");
            return;
        }

        $this->command?->info("Seeding " . count($competitions) . " competitions into MySQL relational database...");

        $totalResults = 0;
        foreach ($competitions as $item) {
            $rawId = str_replace('comp-', '', $item['id'] ?? '');
            
            $comp = Competition::updateOrCreate(
                ['legacy_id' => $rawId ?: $item['id']],
                [
                    'slug' => Str::slug($item['title'] ?? 'sacensibas') . '-' . ($item['date'] ?? date('Y-m-d')),
                    'title' => $item['title'] ?? 'SDK Zīle Sacensības',
                    'date' => $item['date'] ?? date('Y-m-d'),
                    'location' => $item['location'] ?? 'Latvija',
                    'category' => $item['category'] ?? 'Reitings',
                    'summary' => $item['summary'] ?? null,
                    'description' => $item['description'] ?? null,
                    'cover_image' => $item['coverImage'] ?? null,
                    'gallery' => $item['gallery'] ?? [],
                    'original_url' => $item['originalUrl'] ?? null,
                    'status' => $item['status'] ?? 'published',
                ]
            );

            // Seed relational results
            if (!empty($item['results']) && is_array($item['results'])) {
                // Remove existing results to prevent duplicates on re-seed
                $comp->results()->delete();

                foreach ($item['results'] as $res) {
                    CompetitionResult::create([
                        'competition_id' => $comp->id,
                        'couple' => $res['couple'] ?? 'SDK Zīle pāris',
                        'dancer' => $res['dancer'] ?? null,
                        'is_solo' => !empty($res['isSolo']),
                        'placement' => $res['placement'] ?? '–',
                        'age_group' => $res['ageGroup'] ?? $res['group'] ?? 'Bērni I',
                        'discipline' => $res['discipline'] ?? 'Sporta dejas',
                        'notes' => $res['notes'] ?? null,
                    ]);
                    $totalResults++;
                }
            }
        }

        $this->command?->info("Successfully seeded " . count($competitions) . " competitions and {$totalResults} relational results!");
    }
}
