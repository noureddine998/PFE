<?php

namespace App\Http\Controllers;
use App\Models\Candidate;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    
    public function store(Request $request)
    {
        $candidate = Candidate::create($request->all());
        return response()->json($candidate, 201);
    }

    public function fetchCandidates($district_type, $district_name) {
        if ($district_type === 'local') {
            $candidates = Candidate::where('district_name', $district_name)->get();
        } else if ($district_type === 'regional') {
            $candidates = Candidate::where('district_name', $district_name)->get();
        } else {
            return response()->json(['error' => 'Invalid district type'], 400);
        }
        return response()->json($candidates);
    }
    
    public function vote($id)
    {
        $candidate = Candidate::find($id);
        if ($candidate) {
            $candidate->increment('voteCount');
            return response()->json(['message' => 'Vote recorded successfully!', 'candidate' => $candidate]);
        }
        return response()->json(['message' => 'Candidate not found'], 404);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
   
     public function index()
     {
         // Fetch all districts from the database
         $candidates = Candidate::all();
 
         // Pass the data to the view
         return response()->json($candidates);
 }
}
