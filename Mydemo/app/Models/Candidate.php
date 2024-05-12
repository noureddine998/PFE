<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'full_name',
        'age',
        'gender',
        'party',
        'district_type',
        'district_name',
        'voteCount',
    ];



    // Here you can add additional methods or query scopes for your business logic
}
