<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = Contact::all();
        return response()->json($contacts, 200);
    }

    public function store(Request $request)
    {
        // Validation with specific rules
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string|max:255|alpha',
            'lastName' => 'required|string|max:255|alpha',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        // Store contact details safely
        $contact = Contact::create([
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'email' => $request->email,
            'subject' => $request->subject,
            'message' => $request->message,
        ]);

        return response()->json($contact, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['error' => 'Contact not found'], 404);
        }

        return response()->json($contact, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['error' => 'Contact not found'], 404);
        }

        $contact->delete();

        return response()->json(null, 204);
    }
}
