<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Album;
use App\Models\Photo;
use Illuminate\Http\Request;

class PhotoController extends Controller
{
    /**
     * Display a listing of photos with filters.
     */
    public function index(Request $request)
    {
        $query = Photo::with('album')->orderBy('id', 'asc');

        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->filled('album') && $request->album !== 'all') {
            $query->whereHas('album', function ($q) use ($request) {
                $q->where('title', $request->album);
            });
        }

        if ($request->filled('search')) {
            $term = trim($request->search);
            $query->where(function ($q) use ($term) {
                $q->where('name', 'like', "%{$term}%")
                  ->orWhere('category_label', 'like', "%{$term}%")
                  ->orWhereHas('album', function ($aq) use ($term) {
                      $aq->where('title', 'like', "%{$term}%");
                  });
            });
        }

        $total = $query->count();
        $limit = $request->filled('limit') ? (int) $request->limit : 36;
        $photos = $query->take($limit)->get();

        return response()->json([
            'total' => $total,
            'limit' => $limit,
            'photos' => $photos,
        ]);
    }

    /**
     * Return albums summary & statistics for UI.
     */
    public function stats()
    {
        $albums = Album::withCount('photos')->get()->map(function ($album) {
            return [
                'id' => (string) $album->id,
                'title' => $album->title,
                'category' => $album->category,
                'count' => $album->photos_count,
            ];
        });

        $total = Photo::count();

        return response()->json([
            'total' => $total,
            'albums' => $albums,
        ]);
    }
}
