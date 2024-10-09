<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::all();
        return response()->json($clients, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'imageUrl' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            return response()->json(['error' => $errors[0]], 400);
        }

        $imagePath = $request->file('imageUrl')->store('images', 'public'); // Store in 'storage/app/public/images'

        $client = Client::create([
            'name' => $request->name,
            'imageUrl' => $imagePath,
        ]);

        return response()->json($client, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json(['error' => 'Client not found'], 404);
        }

        return response()->json($client, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $client = Client::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'imageUrl' => 'sometimes|required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        if ($request->has('name')) {
            $client->name = $request->input('name');
        }

        if ($request->hasFile('imageUrl')) {
            if ($client->imageUrl && Storage::exists('public/' . $client->imageUrl)) {
                Storage::delete('public/' . $client->imageUrl);
            }

            $imagePath = $request->file('imageUrl')->store('images', 'public');
            $client->imageUrl = $imagePath;
        }

        $client->save();

        return response()->json($client, 200);
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json(['error' => 'Client not found'], 404);
        }

        // Delete image if exists
        if ($client->imageUrl && Storage::exists('public/' . $client->imageUrl)) {
            Storage::delete('public/' . $client->imageUrl);
        }

        $client->delete();

        return response()->json(null, 204);
    }
}
