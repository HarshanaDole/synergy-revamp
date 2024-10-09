<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Subheading;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with('subheadings')->get();
        return response()->json($blogs);
    }

    public function store(Request $request)
    {
        try {

            // Assuming request data comes from FormData
            $subheadings = json_decode($request->input('subheadings'), true);

            // Validate the subheadings field as an array
            $request->merge(['subheadings' => $subheadings]);

            // Validate the incoming request
            $validator = Validator::make($request->all(), [
                'headline' => 'required|string|max:255',
                'author' => 'required|string|max:255',
                'imageUrl' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
                'subheadings' => 'required|array|min:1', // Ensure at least one subheading
                'subheadings.*.subheading' => 'required|string|max:255', // Each subheading is required
                'subheadings.*.content' => 'required|string', // Each content is required
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            if (!$request->hasFile('imageUrl')) {
                return response()->json(['error' => 'Image is required.'], 422);
            }

            // Store the uploaded image
            $imagePath = $request->file('imageUrl')->store('images/blogs', 'public');

            // Log the blog data for debugging
            Log::info('Blog data:', [
                'headline' => $request->headline,
                'author' => $request->author,
                'imageUrl' => $imagePath,
            ]);

            // Save the blog
            $blog = Blog::create([
                'headline' => $request->headline,
                'author' => $request->author,
                'imageUrl' => $imagePath,
            ]);

            // Save the subheadings
            foreach ($request->subheadings as $subheadingData) {
                $subheading = new Subheading([
                    'blog_id' => $blog->id,
                    'subheading' => $subheadingData['subheading'],
                    'content' => $subheadingData['content'],
                ]);
                $blog->subheadings()->save($subheading); // Associate subheading with the blog
            }

            return response()->json($blog->load('subheadings'), 201); // Load subheadings with the response
        } catch (\Exception $e) {
            Log::error('Error storing blog: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while storing the blog.'], 500);
        }
    }

    public function show($id)
    {
        $blog = Blog::with('subheadings')->findOrFail($id);
        return response()->json($blog);
    }

    public function update(Request $request, $id)
    {
        // Assuming request data comes from FormData
        $subheadings = json_decode($request->input('subheadings'), true);

        // Validate the subheadings field as an array
        $request->merge(['subheadings' => $subheadings]);

        // Validate the incoming request
        $validated = $request->validate([
            'headline' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'imageUrl' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
            'subheadings' => 'required|array|min:1', // Ensure at least one subheading
            'subheadings.*.subheading' => 'required|string|max:255', // Each subheading is required
            'subheadings.*.content' => 'required|string', // Each content is required
        ]);

        // Find the blog post by ID
        $blog = Blog::findOrFail($id);

        // Handle file upload for image
        if ($request->hasFile('imageUrl')) {
            // Delete the old image if it exists
            if ($blog->imageUrl) {
                Storage::disk('public')->delete($blog->imageUrl);
            }

            // Store new image
            $imagePath = $request->file('imageUrl')->store('images/blogs', 'public');
            $blog->imageUrl = $imagePath; // Update the blog's image path
        }

        // Update blog data
        $blog->update([
            'headline' => $validated['headline'],
            'author' => $validated['author'],
            // 'imageUrl' is already set above if the image was uploaded
        ]);

        // Delete old subheadings
        $blog->subheadings()->delete();

        // Save the new subheadings
        foreach ($validated['subheadings'] as $subheadingData) {
            $blog->subheadings()->create([
                'subheading' => $subheadingData['subheading'],
                'content' => $subheadingData['content'],
            ]);
        }

        return response()->json($blog->load('subheadings'), 200); // Load subheadings with the response
    }

    public function destroy($id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json(['error' => 'Blog not found'], 404);
        }

        // Delete image if exists
        if ($blog->imageUrl && Storage::exists('public/' . $blog->imageUrl)) {
            Storage::delete('public/' . $blog->imageUrl);
        }

        // Delete associated subheadings
        $blog->subheadings()->delete();

        $blog->delete();

        return response()->json(null, 204);
    }
}
