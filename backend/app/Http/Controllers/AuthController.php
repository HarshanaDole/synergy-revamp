<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * Handle user login.
     */
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            // Regenerate the session to prevent session fixation attacks
            $request->session()->regenerate();

            // Get the authenticated user
            $user = Auth::user();

            if ($user instanceof User) {
                $user->username_verified_at = now();
                $user->save();
            }

            return response()->json(['message' => 'Logged in successfully'], 200);
        }

        return response()->json(['error' => 'Invalid credentials'], 401);
    }

    /**
     * Handle user logout.
     */
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Ensure user is authenticated before accessing this endpoint
        // if (!$request->user()) {
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }

        return response()->json($request->user(), 200);
    }

    /**
     * Display a listing of the resource.
     */
    public function getAllUsers(Request $request)
    {
        // Ensure user is authenticated before accessing this endpoint
        if (!$request->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $users = User::all();
        return response()->json($users, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'secret_key' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    if ($value !== env('SECRET_KEY')) {
                        $fail('The ' . $attribute . ' is invalid.');
                    }
                },
            ],
            'username' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);

        return response()->json($user, 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        // Ensure user is authenticated before accessing this endpoint
        if (!$request->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json($user, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Ensure user is authenticated before accessing this endpoint
        $authenticatedUser = $request->user();
        if (!$authenticatedUser) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Check if the authenticated user is trying to update their own profile
        if ($authenticatedUser->id !== $id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Validation rules
        $validator = Validator::make($request->all(), [
            'username' => 'sometimes|required|string|max:255|unique:users,username,' . $id,
            'password' => 'required_with:newPassword|nullable|string',
            'newPassword' => 'sometimes|nullable|string|min:6',
            'confirmPassword' => 'sometimes|nullable|string|min:6|same:newPassword'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        Log::info('Request data:', $request->all());

        // Update username
        if ($request->has('username')) {
            Log::info('Username update requested.');
            if ($request->has('password')) {
                if (!Hash::check($request->password, $user->password)) {
                    return response()->json(['error' => 'Current password is incorrect'], 400);
                }
            }

            $user->username = $request->username;
        }

        // Update password
        if ($request->filled('newPassword')) {
            Log::info('New password update requested.');
            if (!$request->has('password')) {
                return response()->json(['error' => 'Current password is required to update password'], 400);
            }

            if (!Hash::check($request->password, $user->password)) {
                return response()->json(['error' => 'Current password is incorrect'], 400);
            }

            $user->password = Hash::make($request->newPassword);
        }

        $user->save();

        // Return updated user info
        $userResponse = [
            'username' => $user->username,
            'id' => $user->id,
        ];

        return response()->json($userResponse, 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        // Ensure user is authenticated before accessing this endpoint
        $authenticatedUser = $request->user();
        if (!$authenticatedUser) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Check if the authenticated user is trying to delete their own profile
        if ($authenticatedUser->id !== $id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(null, 204);
    }
}
