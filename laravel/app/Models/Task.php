<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    use HasFactory, SoftDeletes, CreatedUpdatedBy;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'description',
        'deadline',
        'completion',
        'type_id',
        'prority_id'
    ];

    /**
     * Get users assigned to task
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Get type of task
     */
    public function type(): BelongsTo
    {
        return $this->belongsTo(TaskType::class);
    }

    /**
     * Get task prority
     */
    public function prority(): BelongsTo
    {
        return $this->belongsTo(Prority::class);
    }

    /**
     * Get task history
     */
    public function history(): HasMany
    {
        return $this->hasMany(TaskHistory::class);
    }

    /**
     * Get task comments
     */
    public function comments(): HasMany
    {
        return $this->hasMany(TaskComment::class);
    }
}
