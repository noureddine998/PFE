<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EligibleToVote extends Model
{
    use HasFactory;

    protected $table = 'eligible_to_vote';
    
    protected $fillable = [
        'firstName', 'lastName', 'phone',
        'birthDate', 'gender', 'cin', 'region', 'localDistrict'
    ];

   
}


