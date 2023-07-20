<?php

use App\Http\Controllers\ProrityController;
use App\Http\Controllers\AdsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ExpiryDateController;
use App\Http\Controllers\UserController;
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
    Route::get('/eds', function () {
        return Inertia::render('ExpiryDates/index');
    })->name('eds');
    Route::get('/eds/get', [ExpiryDateController::class, 'index']);
    Route::post('/eds/store', [ExpiryDateController::class, 'store']);
    Route::get('/eds/my', [ExpiryDateController::class, 'showMy']);
    Route::get('/eds/destroy/{expiryDate}', [ExpiryDateController::class, 'destroy']);
    Route::post('/eds/update/{expiryDate}', [ExpiryDateController::class, 'update']);
    Route::get('/eds/report', [ExpiryDateController::class, 'report']);

    //PRODUCTS
    Route::get('/product', [ProductController::class, 'index']);
    Route::get('/product/my', [ProductController::class, 'showMy']);
    Route::post('/product/store', [ProductController::class, 'store']);
    Route::get('/product/destroy/{product}', [ProductController::class, 'destroy']);
    Route::post('/product/update/{product}', [ProductController::class, 'update']);

    //ADS
    Route::get('/ads', function () {
        return Inertia::render('Ads/index');
    })->name('ads');
    Route::get('/ads/active', [AdsController::class, 'showActive']);


    //ADMIN
    Route::middleware('can:isAdmin')->group(function () {
        Route::get('/admin', function () {
            return Inertia::render('Admin/index');
        })->name('admin');

        //ADMIN USER
        Route::get('/admin/user', function () {
            return Inertia::render('Admin/User/index');
        })->name('admin.user');
        Route::post('/admin/user/store', [UserController::class, 'store']);
        Route::get('admin/users', [UserController::class, 'index']);
        Route::get('admin/roles', [UserController::class, 'roles']);
        Route::post('admin/user/update/{user}', [UserController::class, 'update']);
        Route::get('admin/user/destroy/{user}', [UserController::class, 'destroy']);

        //ADMIN ADS
        Route::get('/admin/ads', function () {
            return Inertia::render('Admin/Ads/index');
        })->name('admin.ads');
        Route::post('admin/ads/store', [AdsController::class, 'store']);
        Route::get('admin/ads/index', [AdsController::class, 'index']);
        Route::get('admin/ads/destroy/{ads}', [AdsController::class, 'destroy']);
        Route::post('admin/ads/update/{ads}', [AdsController::class, 'update']);

        //ADMIN PRORITY
        Route::get('/admin/prorities', [ProrityController::class, 'index']);
    });
});

require __DIR__ . '/auth.php';
