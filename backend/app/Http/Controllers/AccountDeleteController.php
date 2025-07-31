<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User ;
use App\Models\DeleteAccountRequest ;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

class AccountDeleteController extends Controller
{
    public function requestDelete(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->firstOrFail();

        $token = Str::random(64);

        
        DeleteAccountRequest::updateOrCreate(
            ['user_id' => $user->id],
            [
                'token' => $token,
                'expires_at' => now()->addMinutes(60),
            ]
        );

        $link = route('web.confirm.account.delete', ['token' => $token]);

        
        Mail::raw("Click here to confirm account deletion: $link", function ($message) use ($user) {
            $message->to($user->email)
                    ->subject('Confirm Your Account Deletion');
        });

        return response()->json(['message' => 'Confirmation email sent.']);
    }


    public function confirmDelete($token)
{
    $request = \App\Models\DeleteAccountRequest::where('token', $token)
        ->where('expires_at', '>', now())
        ->first();

    if (!$request) {
        return view('delete.failed'); 
    }

    $user = $request->user;


    $user->delete();
    $request->delete();

    return view('delete.success');
}

}
