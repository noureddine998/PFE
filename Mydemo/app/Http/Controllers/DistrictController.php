<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\District; // Assurez-vous d'importer le modèle District

class DistrictController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $district = District::create($request->all());
        // Retourner une réponse JSON avec le district nouvellement créé
        return response()->json($district, 201);
    }

    public function index()
    {
        // Fetch all districts from the database
        $districts = District::all();

        // Pass the data to the view
        return response()->json($districts);
}

public static function incrementVoters($districtName)
{
    $district = District::where('district_name', $districtName)->first();
    if ($district) {
        $district->number_of_voters += 1;
        $district->save();
    }
}
}
