<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with('client')->get();
        return response()->json($projects);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'type' => 'required|string|max:255',
                'imageUrl' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
                'client_id' => 'required|exists:clients,id',
                'location' => 'required|string|max:255',
                'year' => 'required|string|max:4',
                'description' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $imagePath = $request->file('imageUrl')->store('images', 'public');

            $project = Project::create([
                'type' => $request->type,
                'imageUrl' => $imagePath,
                'client_id' => $request->client_id,
                'location' => $request->location,
                'year' => $request->year,
                'description' => $request->description,
            ]);

            return response()->json($project, 201);
        } catch (\Exception $e) {
            Log::error('Error storing project: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while storing the project.'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return response()->json($project);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'type' => 'sometimes|required|string|max:255',
            'client_id' => 'sometimes|required|exists:clients,id',
            'location' => 'sometimes|required|string|max:255',
            'year' => 'sometimes|required|integer',
            'description' => 'nullable|string',
            'imageUrl' => 'sometimes|required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        if ($request->has('type')) {
            $project->type = $request->input('type');
        }

        if ($request->has('client_id')) {
            $project->client_id = $request->input('client_id');
        }

        if ($request->has('location')) {
            $project->location = $request->input('location');
        }

        if ($request->has('year')) {
            $project->year = $request->input('year');
        }

        if ($request->has('description')) {
            $project->description = $request->input('description');
        }

        if ($request->hasFile('imageUrl')) {
            if ($project->imageUrl && Storage::exists('public/' . $project->imageUrl)) {
                Storage::delete('public/' . $project->imageUrl);
            }

            $imagePath = $request->file('imageUrl')->store('images', 'public');
            $project->imageUrl = $imagePath;
        }

        $project->save();

        return response()->json($project, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['error' => 'Project not found'], 404);
        }

        // Delete image if exists
        if ($project->imageUrl && Storage::exists('public/' . $project->imageUrl)) {
            Storage::delete('public/' . $project->imageUrl);
        }

        $project->delete();

        return response()->json(null, 204);
    }
}
