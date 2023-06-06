<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ExpiryDateController;
use App\Models\ExpiryDate;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        // 'laravelVersion' => Application::VERSION,
        // 'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //EDS
    Route::get('/eds', [ExpiryDateController::class, 'index'])->name('eds.index');
    Route::post('/eds/store', [ExpiryDateController::class, 'store']);

    //PRODUCTS
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/my', [ProductController::class, 'showMy']);
    Route::post('/product/store', [ProductController::class, 'store']);
    Route::get('/product/destroy/{product}', [ProductController::class, 'destroy']);
    Route::post('/product/update/{product}', [ProductController::class, 'update']);
});

require __DIR__ . '/auth.php';
