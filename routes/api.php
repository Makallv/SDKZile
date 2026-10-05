<?php

use App\Http\Controllers\Api\CompetitionController;
use App\Http\Controllers\Api\PhotoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Health check
Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'backend' => 'Laravel 12 / PHP 8.5', 'db' => config('database.default')]);
});

// Competitions public API
Route::get('/competitions', [CompetitionController::class, 'index']);
Route::get('/competitions/{id}', [CompetitionController::class, 'show']);

// Competitions management API
Route::post('/competitions', [CompetitionController::class, 'store']);
Route::put('/competitions/{id}', [CompetitionController::class, 'update']);
Route::delete('/competitions/{id}', [CompetitionController::class, 'destroy']);

// Photo gallery API
Route::get('/photos', [PhotoController::class, 'index']);
Route::get('/photos/stats', [PhotoController::class, 'stats']);

// Authenticated user endpoint (Sanctum)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
