<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Competition;
use App\Models\CompetitionResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CompetitionController extends Controller
{
    /**
     * Display a listing of competitions with relational results.
     */
    public function index(Request $request)
    {
        $query = Competition::with('results')->orderBy('date', 'desc');

        // Filter by category
        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        // Filter by year
        if ($request->filled('year') && $request->year !== 'all') {
            $query->whereYear('date', $request->year);
        }

        // Filter by age group
        if ($request->filled('age_group') && $request->age_group !== 'all') {
            $ag = trim($request->age_group);
            $query->whereHas('results', function ($q) use ($ag) {
                if ($ag === 'Bērni I') {
                    $q->where(function ($sq) {
                        $sq->where('age_group', 'like', '%Bērni I%')
                           ->where('age_group', 'not like', '%Bērni II%');
                    })->orWhere('age_group', 'like', '%Bērni I+II%');
                } elseif ($ag === 'Juniori I') {
                    $q->where(function ($sq) {
                        $sq->where('age_group', 'like', '%Juniori I%')
                           ->where('age_group', 'not like', '%Juniori II%');
                    })->orWhere('age_group', 'like', '%Juniori I+II%');
                } else {
                    $q->where('age_group', 'like', '%' . $ag . '%');
                }
            });
        }

        // Search in title, location, description, or couple names
        if ($request->filled('search')) {
            $term = trim($request->search);
            $query->where(function ($q) use ($term) {
                $q->where('title', 'like', "%{$term}%")
                  ->orWhere('location', 'like', "%{$term}%")
                  ->orWhere('summary', 'like', "%{$term}%")
                  ->orWhere('description', 'like', "%{$term}%")
                  ->orWhereHas('results', function ($rq) use ($term) {
                      $rq->where('couple', 'like', "%{$term}%")
                         ->orWhere('dancer', 'like', "%{$term}%")
                         ->orWhere('age_group', 'like', "%{$term}%")
                         ->orWhere('placement', 'like', "%{$term}%");
                  });
            });
        }

        if ($request->has('limit')) {
            $limit = min((int) $request->limit, 200);
            return response()->json($query->take($limit)->get());
        }

        return response()->json($query->get());
    }

    /**
     * Display the specified competition with results.
     */
    public function show($id)
    {
        $competition = Competition::with('results')
            ->where('id', $id)
            ->orWhere('legacy_id', $id)
            ->orWhere('slug', $id)
            ->first();

        if (!$competition) {
            return response()->json(['error' => 'Sacensības netika atrastas'], 404);
        }

        return response()->json($competition);
    }

    /**
     * Store a newly created competition in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'location' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:100',
            'summary' => 'nullable|string',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|string',
            'gallery' => 'nullable|array',
            'results' => 'nullable|array',
        ]);

        $competition = DB::transaction(function () use ($validated) {
            $comp = Competition::create([
                'title' => $validated['title'],
                'slug' => Str::slug($validated['title']) . '-' . date('Y-m', strtotime($validated['date'])),
                'date' => $validated['date'],
                'location' => $validated['location'] ?? 'Latvija',
                'category' => $validated['category'] ?? 'Reitings',
                'summary' => $validated['summary'] ?? null,
                'description' => $validated['description'] ?? null,
                'cover_image' => $validated['cover_image'] ?? null,
                'gallery' => $validated['gallery'] ?? [],
                'status' => 'published',
            ]);

            if (!empty($validated['results'])) {
                foreach ($validated['results'] as $res) {
                    if (!empty($res['couple']) && !empty($res['placement'])) {
                        CompetitionResult::create([
                            'competition_id' => $comp->id,
                            'couple' => $res['couple'],
                            'dancer' => $res['dancer'] ?? null,
                            'is_solo' => !empty($res['is_solo']),
                            'placement' => $res['placement'],
                            'age_group' => $res['ageGroup'] ?? $res['age_group'] ?? $res['group'] ?? $res['category'] ?? 'Bērni I',
                            'discipline' => $res['discipline'] ?? 'Sporta dejas',
                            'notes' => $res['notes'] ?? null,
                        ]);
                    }
                }
            }

            return $comp->load('results');
        });

        return response()->json($competition, 201);
    }

    /**
     * Update the specified competition in storage.
     */
    public function update(Request $request, $id)
    {
        $competition = Competition::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'date' => 'sometimes|required|date',
            'location' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:100',
            'summary' => 'nullable|string',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|string',
            'gallery' => 'nullable|array',
            'results' => 'nullable|array',
        ]);

        $competition = DB::transaction(function () use ($competition, $validated) {
            $competition->update(collect($validated)->except('results')->toArray());

            if (isset($validated['results'])) {
                $competition->results()->delete();
                foreach ($validated['results'] as $res) {
                    if (!empty($res['couple']) && !empty($res['placement'])) {
                        CompetitionResult::create([
                            'competition_id' => $competition->id,
                            'couple' => $res['couple'],
                            'dancer' => $res['dancer'] ?? null,
                            'is_solo' => !empty($res['is_solo']),
                            'placement' => $res['placement'],
                            'age_group' => $res['ageGroup'] ?? $res['age_group'] ?? $res['group'] ?? $res['category'] ?? 'Bērni I',
                            'discipline' => $res['discipline'] ?? 'Sporta dejas',
                            'notes' => $res['notes'] ?? null,
                        ]);
                    }
                }
            }

            return $competition->load('results');
        });

        return response()->json($competition);
    }

    /**
     * Remove the specified competition from storage.
     */
    public function destroy($id)
    {
        $competition = Competition::findOrFail($id);
        $competition->delete();

        return response()->json(['message' => 'Sacensības veiksmīgi dzēstas']);
    }
}
