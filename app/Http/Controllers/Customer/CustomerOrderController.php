<?php

namespace App\Http\Controllers\Customer;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Pizza;
use App\Models\Order;
use App\Http\Resources\PizzaResource;
use App\Http\Resources\OrderResource;

class CustomerOrderController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $query = Order::query();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("block")) {
            $query->where("block", "like", "%" . request("block") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $orders = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1)->withQueryString();

        return Inertia::render('Customer/CustomerOrderView', [
            "orders" => OrderResource::collection($orders),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        $pizzas = Pizza::all();
        return Inertia::render('Customer/CustomerOrder', ['pizzas' => $pizzas]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $quantities = $request->input('quantities', []);

        // Validate the input
        $request->validate([
            'quantities' => 'required|array',
            'quantities.*' => 'integer|min:0',
            'address' => 'required|string|max:255',
        ]);

        $totalCost = 0;

        foreach ($quantities as $pizzaId => $quantity) {
            if ($quantity > 0) {
                $pizza = Pizza::find($pizzaId);
                if ($pizza) {

                    $cost = $pizza->price * $quantity;
                    $totalCost += $cost;


                    Order::create([
                        'userID' => $user->id,
                        'pizzaID' => $pizzaId,
                        'quantity' => $quantity,
                        'price' => $cost,
                        'address' => $request->input('address'),
                        'status' => $request->input('status'),
                    ]);
                }
            }
        }

        return redirect()->route('customer.orders.index')->with('success', 'Order submitted successfully.');
    }
}
