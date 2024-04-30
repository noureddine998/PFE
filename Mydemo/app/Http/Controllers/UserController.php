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
        $request->session()->regenerate();
        return response()->json(['message' => 'Logged in successfully']);
    }

    return response()->json(['error' => 'The provided credentials do not match our records.'], 401);
}

}

