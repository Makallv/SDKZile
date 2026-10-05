<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompetitionResult extends Model
{
    use HasFactory;

    protected $table = 'competition_results';

    protected $fillable = [
        'competition_id',
        'couple',
        'dancer',
        'is_solo',
        'placement',
        'age_group',
        'discipline',
        'notes',
    ];

    protected $casts = [
        'is_solo' => 'boolean',
    ];

    protected $appends = [
        'ageGroup',
        'group',
        'category',
        'isSolo',
    ];

    public function getAgeGroupAttribute()
    {
        return $this->attributes['age_group'] ?? null;
    }

    public function getGroupAttribute()
    {
        return $this->attributes['age_group'] ?? null;
    }

    public function getCategoryAttribute()
    {
        return $this->attributes['age_group'] ?? null;
    }

    public function getIsSoloAttribute()
    {
        return (bool) ($this->attributes['is_solo'] ?? false);
    }

    /**
     * Parent competition
     */
    public function competition(): BelongsTo
    {
        return $this->belongsTo(Competition::class, 'competition_id');
    }
}
