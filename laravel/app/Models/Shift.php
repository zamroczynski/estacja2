<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\CreatedUpdatedBy;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Shift extends Model
{
    use HasFactory, SoftDeletes, CreatedUpdatedBy;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'time_start',
        'time_stop',
    ];

    public function assignTime() {
        $timeStart = date('H:i', strtotime($this->time_start . ' +1 hour'));
        $timeStop = date('H:i', strtotime($this->time_stop . ' +1 hour'));
        $this->time_start = $timeStart;
        $this->time_stop = $timeStop;
    }
}
