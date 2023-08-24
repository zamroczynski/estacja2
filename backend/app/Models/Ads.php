<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ads extends Model
{
    use HasFactory, SoftDeletes, CreatedUpdatedBy;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'title',
        'description',
        'prority',
        'valid_until',
    ];

    /**
     * Get the user who add the ads.
     */
    public function userCreate(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who update the ads
     */
    public function userUpdate(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Get the user who update the ads
     */
    public function prority(): BelongsTo
    {
        return $this->belongsTo(Prority::class, 'prority_id');
    }
}
