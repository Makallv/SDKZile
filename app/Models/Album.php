<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Album extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'title',
        'category',
        'description',
        'photos_count',
    ];

    public function photos(): HasMany
    {
        return $this->hasMany(Photo::class, 'album_id');
    }
}
