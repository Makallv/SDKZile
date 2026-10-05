<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

// Serve local WordPress uploads directly from web_volumes volume
Route::get('/wp-content/uploads/{path}', function ($path) {
    $fullPath = base_path('web_volumes/volumes/wp_zile_uploads/_data/' . $path);
    if (!File::exists($fullPath)) {
        abort(404);
    }
    return Response::file($fullPath);
})->where('path', '.*');

Route::get('/uploads/{path}', function ($path) {
    $fullPath = base_path('web_volumes/volumes/wp_zile_uploads/_data/' . $path);
    if (!File::exists($fullPath)) {
        abort(404);
    }
    return Response::file($fullPath);
})->where('path', '.*');

// Single Page Application catch-all route
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '.*');
