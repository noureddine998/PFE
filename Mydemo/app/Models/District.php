<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'district_type',
        'district_name',
        'seats_to_win',
        'number_of_voters',
    ];

    // If you need to add relationships or methods, you can add them here
}
