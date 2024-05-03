<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:255',
            'password' => 'required|string|min:8|confirmed',
            'birthDate' => 'required|date',
            'gender' => 'required|string|max:255',
            'cin' => 'required|string|max:255',
            'region' => 'required|string|max:255',
            'localDistrict' => 'required|string|max:255',
        ]);

        // Encrypt the password before saving
        $validatedData['password'] = bcrypt($validatedData['password']);

        // Create the user in the database
        $user = User::create($validatedData);

        // Return a successful response
        return response()->json(['message' => 'User registered successfully!', 'user' => $user], 201);
    }

    public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    if (Auth::attempt($credentials)) {
        $user = Auth::user();
        $token = $user->createToken('YourAppTokenName')->plainTextToken;
        return response()->json(['token' => $token, 'message' => 'Logged in successfully']);
    } else {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    
}

public function getUserDetails(Request $request)
{
    $user = Auth::user(); // Get the authenticated user
    return response()->json([
        'localDistrict' => $user->localDistrict,
        'region' => $user->region
    ]);
}


}

