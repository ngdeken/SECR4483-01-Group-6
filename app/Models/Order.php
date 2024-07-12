<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    public $table = 'orders';
    protected $fillable = [
        'id',
        'pizzaID',
        'quantity',
        'price',
        'address',
        'status',
        'userID',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userID', 'id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'userID');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'userID');
    }
    
    public function order()
    {
        return $this->belongsTo(Pizza::class, 'pizzaID', 'id');
    }
}

