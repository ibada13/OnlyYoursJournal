<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Mockery\Generator\StringManipulation\Pass\Pass;

class AuthController extends Controller
{
public function register(Request $request)
{
    $validated = $request->validate([
        'name'     => 'required|string|max:255',
        'email'    => 'required|email|unique:users,email',
        'password' => 'required|min:6|confirmed',
    ]);

    $user = User::create([
        'name'     => $validated['name'],
        'email'    => $validated['email'],
        'password' => Hash::make($validated['password']),
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Registered successfully',
        'user'    => $user,
        'token'   => $token,
    ]);
}

public function login(Request $request)
{
    $request->validate([
        'email'    => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
            return Response()->json([
                "message"=>"Invalid Credentials."
            ],401);
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Login successful',
        'user'    => $user,
        'token'   => $token,
    ]);
}

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function updateProfile(Request $request){
  $user = Auth::user();

    if (!$request->hasAny(['name', 'email'])) {
        return response()->json([
            'message' => 'No data provided to update.'
        ], 422);
    }

    $data = $request->validate([
        'name' => ['sometimes', 'string', 'max:255'],
        'email' => ['sometimes', 'email', 'max:255', 'unique:users,email,' . $user->id],
    ]);

    if (isset($data['name'])) {
        $user->name = $data['name'];
    }

    if (isset($data['email'])) {
        $user->email = $data['email'];
    }

    $user->save();

    return response()->json([
        'message' => 'Profile updated successfully.',
        'user' => $user,
    ]);

    }




    public function destroy()
{
    Auth::user()->delete();

    return response()->json(['message' => 'User deleted']);
}
}

