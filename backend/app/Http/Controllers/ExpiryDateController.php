<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExpiryDateRequest;
use App\Http\Requests\UpdateExpiryDateRequest;
use App\Models\ExpiryDate;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;

class ExpiryDateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        // $expiryDates = ExpiryDate::with('product')->paginate(15, ['date', 'amount']);
        $expiryDates = ExpiryDate::with('product')->get();
        // dd($expiryDates);
        $response = [];
        foreach (ExpiryDate::with('product')->paginate(15) as $expiryDate) {
            // dd($expiryDate);
            $response[] = [
                'id' => $expiryDate->id,
                'name' => $expiryDate->product->name,
                'date' => $expiryDate->date,
                'amount' => $expiryDate->amount,
            ];
        }
        // dd($response);
        return Inertia::render('ExpiryDates/index', [
            'expiryDates' => $response,
        ]);
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
    public function store(StoreExpiryDateRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ExpiryDate $expiryDate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExpiryDate $expiryDate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExpiryDateRequest $request, ExpiryDate $expiryDate)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExpiryDate $expiryDate)
    {
        //
    }
}
