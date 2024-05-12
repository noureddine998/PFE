<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string'
        ]);

        if (Auth::guard('admin')->attempt($credentials)) {
            $admin = Auth::guard('admin')->user();
            $token = $admin->createToken('AdminAppTokenName')->plainTextToken;
            return response()->json(['token' => $token, 'message' => 'Admin logged in successfully']);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function getUserDetails(Request $request)
    {
        $admin = Auth::guard('admin')->user();
        return response()->json(['username' => $admin->username]);
    }
}
