<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExpiryDate extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<date, int, int, int>
     */
    protected $fillable = [
        'date',
        'product_id',
        'amount',
        'create_by',
        'update_by',
    ];

    /**
     * Get the product for the expiry date.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the user who add the expiry date.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
