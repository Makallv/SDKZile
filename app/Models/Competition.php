<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Competition extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'legacy_id',
        'title',
        'date',
        'location',
        'category',
        'summary',
        'description',
        'cover_image',
        'gallery',
        'original_url',
        'status',
    ];

    protected $casts = [
        'date' => 'date:Y-m-d',
        'gallery' => 'array',
    ];

    protected $appends = ['coverImage'];

    public function getCoverImageAttribute()
    {
        return $this->attributes['cover_image'] ?? null;
    }

    /**
     * Relational connection to competition results
     */
    public function results(): HasMany
    {
        return $this->hasMany(CompetitionResult::class, 'competition_id');
    }
}
