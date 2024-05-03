<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    use HasApiTokens,HasFactory;

    protected $fillable = [
        'firstName', 'lastName', 'email', 'phone', 'password',
        'birthDate', 'gender', 'cin', 'region', 'localDistrict'
    ];
    
}


