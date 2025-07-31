<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController ;
use App\Http\Controllers\JournalController ;
use App\Http\Controllers\AccountDeleteController ;
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




Route::middleware('auth:sanctum')->group(function(){

    Route::post('/journals', [JournalController::class, 'store']);
    
    Route::get('/journals', [JournalController::class, 'index']);
    
    Route::get('/journals/{journal}', [JournalController::class, 'show']);

    Route::put('/journals/{journal}', [JournalController::class, 'update']);

    Route::delete('/journals/{journal}', [JournalController::class, 'destroy']);
    Route::delete("/journals" ,[JournalController::class , 'destroyAll']);

    Route::put("/me"  , [AuthController::class , 'updateProfile'] );
    Route::delete("/me"  , [AuthController::class , 'destroy'] );
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/request-account-delete', [AccountDeleteController::class, 'requestDelete']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});