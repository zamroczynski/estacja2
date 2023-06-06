<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExpiryDateRequest;
use App\Http\Requests\UpdateExpiryDateRequest;
use App\Models\ExpiryDate;
use Carbon\Carbon;
use Exception;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;
use ErrorException;

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
                'errors' => $request->errors,
            ]);
        } else {
            $date = $request->query('newDate');
            $expiryDates = ExpiryDate::with('product')->where('date', '=', $date)->get();
            return response()->json([
                'expiryDates' => $expiryDates,
                'errors' => $request->errors,
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
        $validated = $request->validate([
            'product.id' => ['required', 'integer'],
            'date' => ['required', 'date'],
        ]);
        $requestDate = $request->date;
        $requestProductId = $request->input('product.id');
        $requestAmount = $request->amount;
        $checkExpiryDateExist = ExpiryDate::where('date', '=', $requestDate)->where('product_id', '=', $requestProductId)->first();
        if ($checkExpiryDateExist != null) {
            $errors = ['status' => '500', 'message' => 'Taki termin już istnieje!'];
            return to_route('eds.index', ['errors' => $errors]);
        }
        $expiryDate = new ExpiryDate();
        $expiryDate->date = $requestDate;
        $expiryDate->product_id = $requestProductId;
        $expiryDate->amount = $requestAmount;
        $expiryDate->save();
        return to_route('eds.index');
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
