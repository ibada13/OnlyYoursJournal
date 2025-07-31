<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountDeleteController ;
Route::get('/', function () {
    return view('welcome');
});



Route::get('/confirm-account-delete/{token}', [AccountDeleteController::class, 'confirmDelete'])
    ->name('web.confirm.account.delete');
