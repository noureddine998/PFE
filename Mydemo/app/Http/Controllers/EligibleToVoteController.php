<?php

namespace App\Http\Controllers;

use App\Models\EligibleToVote;
use Illuminate\Http\Request;

class EligibleToVoteController extends Controller
{
    public function checkEligibility(Request $request)
    {
        $request->validate([
            'cin' => 'required|string',
            'phone' => 'required|string',
            'firstName' => 'required|string',
            'lastName' => 'required|string',
        ]);

        $isEligible = EligibleToVote::where('cin', $request->cin)
            ->where('phone', $request->phone)
            ->where('firstName', $request->firstName)
            ->where('lastName', $request->lastName)
            ->exists();

        return response()->json(['eligible' => $isEligible]);
    }
}
