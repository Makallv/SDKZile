<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\Photo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class PhotoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonPath = base_path('server/data/all_photos.json');
        if (!File::exists($jsonPath)) {
            $this->command?->warn("Photos JSON not found at: {$jsonPath}");
            return;
        }

        $payload = json_decode(File::get($jsonPath), true);
        if (!is_array($payload)) {
            $this->command?->error("Invalid photos payload.");
            return;
        }

        $albums = $payload['albums'] ?? [];
        $photos = $payload['photos'] ?? [];

        $this->command?->info("Seeding " . count($albums) . " albums and " . count($photos) . " photos into MySQL...");

        foreach ($albums as $alb) {
            Album::updateOrCreate(
                ['id' => $alb['id']],
                [
                    'title' => $alb['title'] ?? 'Kluba Galerija',
                    'category' => $alb['category'] ?? 'sacensibas',
                    'photos_count' => $alb['count'] ?? 0,
                ]
            );
        }

        // Clear existing photos to prevent duplicate inserts on re-seed
        Photo::truncate();

        // Batch insert photos in chunks of 500 for high performance
        $chunks = array_chunk($photos, 500);
        foreach ($chunks as $chunk) {
            $insertData = [];
            foreach ($chunk as $p) {
                $insertData[] = [
                    'album_id' => $p['albumId'] ?? 1,
                    'photo_id' => $p['photoId'] ?? null,
                    'url' => $p['url'],
                    'thumb' => $p['thumb'] ?? $p['url'],
                    'name' => $p['name'] ?? null,
                    'category' => $p['category'] ?? 'sacensibas',
                    'category_label' => $p['categoryLabel'] ?? null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            Photo::insert($insertData);
        }

        $this->command?->info("Successfully seeded " . count($photos) . " photos across " . count($albums) . " albums!");
    }
}
