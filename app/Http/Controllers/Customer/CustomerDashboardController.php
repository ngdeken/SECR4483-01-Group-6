<?php

namespace App\Http\Controllers\Customer;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class CustomerDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        return Inertia::render('Customer/CustomerDashboard', [
        ]);
    }
}
