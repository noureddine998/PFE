<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/districts', [DistrictController::class, 'store']);
Route::post('/candidates', [CandidateController::class, 'store']);



Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);


Route::get('/candidates/{district_type}/{district_name}', [CandidateController::class, 'fetchCandidates']);




// Define the route for fetching user details
Route::middleware('auth:sanctum')->get('/user/details', [UserController::class, 'getUserDetails']);
