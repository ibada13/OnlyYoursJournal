<?php

namespace App\Http\Controllers;


use App\Models\Salt;
use App\Models\Journal;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Auth ;

class JournalController extends Controller
{
    /**
     * Display a listing of the resource.
            */
public function index(Request $request)
{
    $user = $request->user();
    $date = $request->query('date');

    $journals = Journal::with('salt:id,salt,iv')
        ->where('user_id', $user->id)
        ->when($date, function ($query, $date) {
            return $query->whereDate('created_at', $date);
        })
        ->select('id', 'title', 'created_at', 'updated_at', 'salt_id')
        ->latest()
        ->paginate(10);

    return response()->json($journals);
}



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

public function store(Request $request)
{
    $request->validate([
        'iv'=>"required|string",
        'salt' => 'required|string',
        'title' => 'required|string|max:255',
        'content' => 'required|string',
    ]);

    
    $salt = Salt::firstOrCreate(
        ['salt' => $request->salt,
        'iv' => $request->iv],
 
    );

    $journal = Journal::create([
        'id' => Str::uuid(),
        'user_id' => $request->user()->id, 
        'salt_id' => $salt->id,
        'title' => $request->title,
        'content' => $request->content,
    ]);

    return response()->json(["id"=>$journal->id], 201);
}


    /**
     * Display the specified resource.
     */
public function show(Journal $journal)
{
    if (Auth::id() !== $journal->user_id) {
        return response()->json(['message' => 'Not authorized.'], 403);
    }

        return response()->json([
        'content' => $journal->content,
        'salt' => $journal->salt->salt,
        'iv' => $journal->salt->iv,
    ]);
}


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Journal $journal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
 public function update(Request $request, Journal $journal)
{
    if ($journal->user_id !== Auth::id()) {
        return response()->json(['message' => 'Forbidden'], 403);
    }

    $validated = $request->validate([
        'title' => 'required|string',
        'content' => 'required|string',
        'salt' => 'required|string',
        'iv' => 'required|string',
    ]);
    
    $salt = Salt::firstOrCreate(
    ['salt' => $validated['salt']],
    ['iv' => $validated['iv']]
                                );

    $journal->update([
        'title' => $validated['title'],
        'content' => $validated['content'],
        'salt_id'=>$salt->id ,
    ]);


    return response()->json(['message' => 'Updated successfully', 'id' => $journal->id]);
}


    /**
     * Remove the specified resource from storage.
     * it takes Journal as param
     * @return Json that sontaines the message
     */
public function destroy(Journal $journal)
{
    $user = Auth::user();

    if ($journal->user_id !== $user->id) {
        return response()->json(['message' => 'Unauthorized.'], 403);
    }

    $journal->delete();

    return response()->json(['message' => 'Journal deleted successfully.']);
}
        public function destroyAll()
{
    $user = Auth::user();

    Journal::where('user_id', $user->id)->get()->each->delete();

    return response()->json(['message' => 'All journals deleted successfully.'], 200);
}

}
