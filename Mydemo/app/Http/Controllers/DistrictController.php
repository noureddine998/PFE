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
        // Valider les données du formulaire (vous pouvez utiliser les règles de validation appropriées ici)
        $validatedData = $request->validate([
            'district_type' => 'required',
            'district_name' => 'required|unique:districts', // Assurez-vous qu'il est unique si c'est la clé primaire
            'seats_to_win' => 'required|integer',
        ]);

        // Créer un nouveau district avec les données validées
        $district = District::create($validatedData);

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
}
