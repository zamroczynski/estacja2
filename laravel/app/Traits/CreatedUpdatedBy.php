<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

trait CreatedUpdatedBy
{
    public static function bootCreatedUpdatedBy()
    {
        // updating created_by and updated_by when model is created
        static::creating(function ($model) {
            if (!$model->isDirty('created_by')) {
                $model->created_by = auth()->user()->id;
            }
            if (!$model->isDirty('updated_by')) {
                $model->updated_by = auth()->user()->id;
            }
        });

        // updating updated_by when model is updated
        static::updating(function ($model) {
            if (!$model->isDirty('updated_by')) {
                $model->updated_by = auth()->user()->id;
            }
        });
    }

    /**
     * Get the user who add the resource.
     */
    public function userCreate(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who update the resource.
     */
    public function userUpdate(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
