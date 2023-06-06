<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->has('name')) {
            $name = $request->get('name');
            return response()->json([
                'products' => Product::where('name', 'LIKE', '%' . $name . '%')->get(['id', 'name']),
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $validated = $request->validate([
            'productName' => ['required', 'string', 'max:255'],
        ]);
        $checkProductNameExist = Product::where('name', '=', $request->productName)->first();
        if ($checkProductNameExist != null) {
            $errors = ['status' => '500', 'message' => 'Taki produkt już istnieje!'];
            return to_route('eds.index', ['errors' => $errors]);
        }
        $product = new Product();
        $product->name = $request->productName;
        $product->save();
        return to_route('eds.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
