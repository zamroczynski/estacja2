<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;
use App\Enums\UserRole;

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
        $checkProductNameExist = Product::where('name', '=', $request->productName)->withTrashed()->first();
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
     * Display products added by user
     * Display all products for admin
     */
    public function showMy(Request $request)
    {
        if (in_array($request->user()->role, [UserRole::ADMIN, UserRole::NEW_ADMIN])) {
            $products = Product::all();
        } else {
            $products = Product::where('created_by', '=', $request->user()->id)->get();
        }
        return response()->json([
            'products' => $products,
        ]);
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
     * 
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        if ($request->user()->cannot('update', $product)) {
            $errors = ['status' => '500', 'message' => 'Brak uprawnień!'];
            return to_route('eds.index', ['errors' => $errors]);
        }
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);
        $checkProductNameExist = Product::where('name', '=', $request->name)->withTrashed()->first();
        if ($checkProductNameExist != null) {
            $errors = ['status' => '500', 'message' => 'Nazwa zajęta'];
            return to_route('eds.index', ['errors' => $errors]);
        }
        $product->name = $request->name;
        $product->save();
        return to_route('eds.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Product $product)
    {
        if ($request->user()->cannot('delete', $product)) {
            $errors = ['status' => '500', 'message' => 'Brak uprawnień!'];
            return to_route('eds.index', ['errors' => $errors]);
        }
        // $this->authorize('delete', $product);
        $product->delete();
        return to_route('eds.index');
    }
}
