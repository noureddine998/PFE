<?php

namespace App\Http\Controllers;
use App\Models\Candidate;
use Illuminate\Http\Request;
use App\Models\District; // Assurez-vous d'importer le modèle District

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

 public function setSeatsToCandidates($district_name)
{
    try {
        $district = District::where('district_name', $district_name)->first();
        if (!$district) {
            return response()->json(['message' => 'District not found'], 404);
        }

        $candidates = Candidate::where('district_name', $district_name)->get();
        $seatsToWin = $district->seats_to_win;
        if ($district->number_of_voters == 0) {
            return response()->json(['message' => 'No voters registered'], 400);
        }
        $electoralDenominator = intdiv($district->number_of_voters, $seatsToWin);

        // Clone the original candidates collection to manipulate vote counts in memory
        $workingCandidates = $candidates->map(function ($candidate) {
            return (object)[
                'id' => $candidate->id,
                'voteCount' => $candidate->voteCount,
                'seatsWon' => $candidate->seatsWon
            ];
        });

        while ($seatsToWin > 0) {
            $workingCandidates = $workingCandidates->filter(function ($candidate) {
                return $candidate->voteCount > 0;
            });

            if ($workingCandidates->isEmpty()) {
                break;
            }

            $winner = $workingCandidates->sortByDesc('voteCount')->first();
            $winner->seatsWon++;

            // Adjust the vote count in memory, not in the database
            $winner->voteCount = max(0, $winner->voteCount - $electoralDenominator);

            // Persist the seat allocation to the database
            Candidate::find($winner->id)->increment('seatsWon');

            $seatsToWin--;
        }
        
        return response()->json(['message' => 'Seats successfully allocated']);
    } catch (\Exception $e) {
        // Log exception details to help in debugging
        \Log::error($e->getMessage());
        return response()->json(['message' => 'An error occurred'], 500);
    }
}


public function allocateSeatsToAll()
{
    // Fetch all districts from the database
    $districts = District::all();

    // Iterate over each district and allocate seats
    foreach ($districts as $district) {
        $this->setSeatsToCandidates($district->district_name);
    }

    return response()->json(['message' => 'Seats successfully allocated']);
}

 
 

}
