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
            $candidates = Candidate::where('local_district', $district_name)->get();
        } else if ($district_type === 'regional') {
            $candidates = Candidate::where('region', $district_name)->get();
        } else {
            return response()->json(['error' => 'Invalid district type'], 400);
        }
        return response()->json($candidates);
    }
    

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
   
}
