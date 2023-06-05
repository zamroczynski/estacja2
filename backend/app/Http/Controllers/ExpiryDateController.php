<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExpiryDateRequest;
use App\Http\Requests\UpdateExpiryDateRequest;
use App\Models\ExpiryDate;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;

class ExpiryDateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        if (!$request->has('newDate')) {
            $date = Carbon::now('Europe/Warsaw')->format('Y-m-d');
            $expiryDates = ExpiryDate::with('product')->where('date', '=', $date)->get();
            return Inertia::render('ExpiryDates/index', [
                'expiryDates' => $expiryDates,
            ]);
        } else {
            $date = $request->query('newDate');
            $expiryDates = ExpiryDate::with('product')->where('date', '=', $date)->get();
            return response()->json([
                'expiryDates' => $expiryDates,
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
