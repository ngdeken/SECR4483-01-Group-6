<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminUserController;

/*Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});*/

Route::redirect('/', '/dashboard');

Route::get('/dashboard', function () {
    if (auth()->user()->isAdmin()) {
        return redirect()->route('admin.index');
    }
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.index');
    Route::get('admin/user', [AdminUserController::class, 'index'])->name('admin.user');
    Route::get('admin/create', [AdminUserController::class, 'create'])->name('admin.create');
    Route::post('admin/create', [AdminUserController::class, 'store'])->name('admin.create.store');
    Route::get('admin/user/{user}', [AdminUserController::class, 'edit'])->name('admin.user.edit');
    Route::put('admin/user/{user}', [AdminUserController::class, 'update'])->name('admin.user.update');
    Route::delete('admin/user/{user}', [AdminUserController::class, 'destroy'])->name('admin.user.destroy');
});

require __DIR__.'/auth.php';
